import { User } from '@prisma/client'

interface props {
    firstName: string
    lastName: string
    className?: string
    onClick?: (...args: any) => any
}

export function UserCircle({ firstName,lastName, onClick, className }: props) {
    return (
        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            onClick={onClick}
        >
            <h2>
                {firstName.charAt(0).toUpperCase()}
                {lastName.charAt(0).toUpperCase()}
            </h2>
        </div>
    )
}