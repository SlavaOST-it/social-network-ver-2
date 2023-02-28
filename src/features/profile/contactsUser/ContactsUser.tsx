import React, {FC, useState} from 'react';
import s from "./ContactsUser.module.scss"
import {useAppSelector} from "../../../utils/hooks/hooks";
import {retry} from "@reduxjs/toolkit/query";


type ActiveBlockType = 'me' | 'contacts' | 'job'

export const ContactsUser = () => {
    const aboutMe = useAppSelector(state => state.profile.profile?.aboutMe)
    const contacts = useAppSelector(state => state.profile.profile?.contacts)
    const aboutJob = useAppSelector(state => state.profile.profile?.lookingForAJobDescription)

    const [activeBlock, setActiveBlock] = useState<ActiveBlockType>('me')

    const selectBlock = (value: ActiveBlockType) => {
        setActiveBlock(value)
    }

    const itemRender = [
        {title: 'GitHub', link: contacts?.github},
        {title: 'VK', link: contacts?.vk},
        {title: 'Facebook', link: contacts?.facebook},
        {title: 'Instagram', link: contacts?.instagram},
        {title: 'Twitter', link: contacts?.twitter},
        {title: 'Website', link: contacts?.website},
        {title: 'Youtube', link: contacts?.youtube},
        {title: 'MainLink', link: contacts?.mainLink}
    ]

    return (
        <div className={s.contacts}>
            <div className={s.linksBlock}>
                <span onClick={() => selectBlock('me')}
                      className={activeBlock === 'me' ? s.activeLink : s.link}
                >
                    Обо мне
                </span>

                <span onClick={() => selectBlock('contacts')}
                      className={activeBlock === 'contacts' ? s.activeLink : s.link}
                >
                    Контакты
                </span>

                <span onClick={() => selectBlock('job')}
                      className={activeBlock === 'job' ? s.activeLink : s.link}
                >
                    Мои навыки
                </span>
            </div>


            <div className={s.description}>
                {activeBlock === 'me' &&
                    <div>
                        {aboutMe?.length
                            ? <span className={s.spanDescription}>{aboutMe}</span>
                            : <span className={s.spanNoDescription}> Нет описания </span>}
                    </div>
                }

                {activeBlock === 'contacts' &&
                    <div className={s.contactsItem}>
                        Contacts: {Object.keys(contacts!).map(key =>{
                        return <Contact key={key} contactTitle={key} contactValue={contacts[key] ? contacts[key] : "нет информации"}/>
                        })
                    }
                        {itemRender.map((el) =>
                            <div>
                                <span>{el.title}:</span> <b>{el.link ? el.link : 'нет информации'}</b>
                            </div>)
                        }
                    </div>
                }

                {activeBlock === 'job' &&
                    <div>
                        {aboutJob?.length
                            ? <span className={s.spanDescription}>{aboutJob}</span>
                            : <span className={s.spanNoDescription}>Нет описания </span>}
                    </div>
                }
            </div>

        </div>
    );
};

type ContactType = {
    contactTitle: string,
    contactValue: string | null
}
const Contact: FC<ContactType> = ({contactTitle, contactValue})=>{
    return(
        <div>
            <span>{contactTitle}:</span> <b>{contactValue ? contactValue : 'нет информации'}</b>
        </div>
    )
}