import { UserCircle } from '~/components/user-circle'
import { Kudo as IKudo } from '@prisma/client'
import {backgroundColorMap, colorMap, emojiMap} from "~/utils/constants";

export function Kudo({ firstName,lastName, kudo }: { firstName: string;lastName: string; kudo: Partial<IKudo> }) {
    return (
        <div
            className={`flex ${
                backgroundColorMap[kudo.style?.backgroundColor || 'RED']
            } p-4 rounded-xl w-full gap-x-2 relative`}
        >
            <div>
                <UserCircle firstName={firstName} lastName={lastName} className="h-16 w-16" />
            </div>
            <div className="flex flex-col">
                <p className={`${colorMap[kudo.style?.textColor || 'WHITE']} font-bold text-lg whitespace-pre-wrap break-all`}>
                    {firstName} {lastName}
                </p>
                <p className={`${colorMap[kudo.style?.textColor || 'WHITE']} whitespace-pre-wrap break-all`}>{kudo.message}</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                {emojiMap[kudo.style?.emoji || 'THUMBSUP']}
            </div>
        </div>
    )
}