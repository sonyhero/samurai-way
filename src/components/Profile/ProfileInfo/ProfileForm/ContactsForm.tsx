import {useSelector} from "react-redux";
import {getContacts} from "../../../../app/selectors/profile-selector";
import {fieldCreator, Input} from "../../../common/FormsControls/FormsControl";
import React from "react";

export const ContactsForm = () => {
    const contacts = useSelector(getContacts)
    const mappedContacts = Object.keys(contacts).map((key, index) => {
        return <div key={index}>{key}: {fieldCreator(`contacts.${key}`, key, [], Input)}</div>
    })
    return <div>{mappedContacts}</div>
}