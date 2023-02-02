import React, {useState} from 'react';
import s from "./ContactsUser.module.scss"
import {useAppSelector} from "../../../utils/hooks/hooks";


type ActiveBlockType = 'me' | 'contacts' | 'job'

export const ContactsUser = () => {
    const aboutMe = useAppSelector(state => state.profile.profile?.aboutMe)
    const contacts = useAppSelector(state => state.profile.profile?.contacts)
    const aboutJob = useAppSelector(state => state.profile.profile?.lookingForAJobDescription)

    const [activeBlock, setActiveBlock] = useState<ActiveBlockType>('me')
    // const [activeStyle, setActiveStyle] = useState<ActiveBlockType>('me')


    const selectBlock = (value: ActiveBlockType) => {
        setActiveBlock(value)
    }


    const itemRender = [
        {title: 'gitHub', link: contacts?.github},
        {title: 'vk', link: contacts?.vk},
        {title: 'facebook', link: contacts?.facebook},
        {title: 'instagram', link: contacts?.instagram},
        {title: 'twitter', link: contacts?.twitter},
        {title: 'website', link: contacts?.website},
        {title: 'youtube', link: contacts?.youtube},
        {title: 'mainLink', link: contacts?.mainLink}
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
                    О работе
                </span>
            </div>


            <div className={s.description}>
                {activeBlock === 'me' &&
                    <div>
                        {aboutMe?.length ? aboutMe : 'Нет описания'}
                    </div>
                }

                {activeBlock === 'contacts' &&
                    <div className={s.contactsItem}>
                        {itemRender.map((el) =>
                            <div>
                                <span>{el.title}:</span> {el.link ? el.link : 'нет информации'}
                            </div>)}
                    </div>
                }

                {activeBlock === 'job' &&
                    <div>
                        {aboutJob?.length ? aboutJob : 'Нет описания'}
                    </div>
                }
            </div>

        </div>
    );
};
