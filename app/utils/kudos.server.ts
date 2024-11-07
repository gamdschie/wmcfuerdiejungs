import { prisma } from './prisma.server'
import { KudoStyle, Prisma } from '@prisma/client'

export const createKudo = async (message: string, userId: number, recipientId: number, style: { id?: number; backgroundColor: string; textColor: string; emoji: string }) => {
    await prisma.kudo.create({
        data: {
            message,
            style: {
                connectOrCreate: {
                    where: { id: style.id || 0 },
                    create: {
                        backgroundColor: style.backgroundColor,
                        textColor: style.textColor,
                        emoji: style.emoji,
                    },
                },
            },
            author: {
                connect: {
                    id: userId,
                },
            },
            recipient: {
                connect: {
                    id: recipientId,
                },
            },
        },
    });
}

export const getFilteredKudos = async (
    userId: number,
    sortFilter: Prisma.KudoOrderByWithRelationInput,
    whereFilter: Prisma.KudoWhereInput,
) => {
    return prisma.kudo.findMany({
        select: {
            id: true,
            style: true,
            message: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
        orderBy: {
            ...sortFilter,
        },
        where: {
            recipientId: userId,
            ...whereFilter,
        },
    });
}

export const getRecentKudos = async () => {
    return prisma.kudo.findMany({
        take: 3,
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            style: {
                select: {
                    emoji: true,
                },
            },
            recipient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    })
}