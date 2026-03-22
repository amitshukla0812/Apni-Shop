
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'


export default function TermsConditionPage() {


    let [settingData, setSettingData] = useState({

        termsCondition: "",

    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    termsCondition: item.termsCondition ? item.termsCondition : settingData.termsCondition,

                })
            }

        })()
    }, [SettingStateData.length])


    return (
        <div className="container my-5">
            <div dangerouslySetInnerHTML={{ __html: settingData.termsCondition }} />
        </div>
    )
}
