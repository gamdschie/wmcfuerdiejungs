import {json, LoaderFunction} from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { Layout } from '~/components/layout'
import { UserPanel } from '~/components/user-panel'
import {getOtherUsers} from "~/utils/user.server";
import {useLoaderData, Outlet} from "@remix-run/react";
import {getFilteredKudos, getRecentKudos} from "~/utils/kudos.server";
import {Kudo} from "~/components/kudo";
import { Kudo as IKudo, Prisma } from '@prisma/client'
import {SearchBar} from "~/components/search-bar";
import {RecentBar} from "~/components/recent-bar";

interface KudoWithProfile extends IKudo {
    author: {
        firstName: string
        lastName: string
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)


    const url = new URL(request.url)
    const sort = url.searchParams.get('sort')
    const filter = url.searchParams.get('filter')
    let sortOptions: Prisma.KudoOrderByWithRelationInput = {}
    if (sort) {
        if (sort === 'date') {
            sortOptions = { createdAt: 'desc' }
        }
        if (sort === 'sender') {
            sortOptions = { author: {  firstName: 'asc'  } }
        }
        if (sort === 'emoji') {
            sortOptions = { style: { emoji: 'asc' } }
        }
    }

    let textFilter: Prisma.KudoWhereInput = {};
    if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        textFilter = {
            OR: [
                { message: { contains: lowerCaseFilter } },
                {
                    author: {
                        OR: [
                            { firstName: { contains: lowerCaseFilter } },
                            { lastName: { contains: lowerCaseFilter } },
                        ],
                    },
                },
            ],
        };
    }


    const users = await getOtherUsers(userId)
    const kudos = await getFilteredKudos(userId, sortOptions, textFilter)
    const recentKudos = await getRecentKudos()

    return json({ users, kudos, recentKudos  })
}

export default function Home() {
    // @ts-ignore
    const { users, kudos, recentKudos } = useLoaderData()
    return (
        <Layout>
            <Outlet />
            <div className="h-full flex">
                <UserPanel users={users} />
                <div className="flex-1 flex flex-col">
                    <SearchBar />
                    <div className="flex-1 flex">
                        <div className="w-full p-10 flex flex-col gap-y-4">
                            {kudos.map((kudo: KudoWithProfile) => (
                                <Kudo key={kudo.id} kudo={kudo} firstName={kudo.author.firstName} lastName={kudo.author.lastName} />
                            ))}
                        </div>
                        <RecentBar kudos={recentKudos} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
