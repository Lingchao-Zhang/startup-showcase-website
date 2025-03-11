import { formatDate } from "@/lib/utils"
import { startupInfoType } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"

const StartupCard = ({startupInfo}: {startupInfo: startupInfoType}) => {
    const {_id,title,img,desc, author: {_id: authorId, name: authorName, avatar }, _createdAt, views, category} = startupInfo
    return(
        <section className="startup-card">
            <div>
                <Link href={`/startupDetail/${_id}`}>
                 <span className="text-24-black">{title}</span>
                </Link>
            </div>
            <div className="flex-between py-3">
                <Link className="flex items-center gap-2" href={`/profile/${authorId}`}>
                    <Image 
                    src={avatar}
                    width={50}
                    height={50}
                    alt="avatar"
                    />
                    <span className="text-20-medium">{authorName}</span>
                </Link>
                <div className="flex gap-1">
                    <Eye />
                    {views}
                </div>
            </div>
            <span className="startup-card_date">
                 {formatDate(_createdAt)}
            </span>
            <p className="startup-card_desc py-5">
                 {desc}
            </p>
            <div>
                <Image 
                 src={img}
                 width={300}
                 height={500}
                 className="startup-card_img"
                 alt="startup card image"
                />
            </div>
            <div className="pt-6">
                <Link href={`/?query=${category}`} className="startup-card_btn">{category}</Link>
            </div>
        </section>
    )
}

export default StartupCard