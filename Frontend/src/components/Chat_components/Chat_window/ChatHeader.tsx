import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatData, Currentsocket } from "../../../context/ChatUserContext";
import { AccessPopUp } from "../PopUps/AccessPopUp";
import { AddMemberPopUp } from "../PopUps/AddMemberPopUp";
import { LeavePopUp } from "../PopUps/LeavePopUp";
import { RestrictPopUp } from "../PopUps/RestrictPopUp";
import { RolePopUp } from "../PopUps/RolePopUp";

enum POPUPS {
    ADDMEMBER = 'addmember',
    UPDATEROLE = 'updaterole',
    UPDATEACCESS = 'updateacess',
    RESTRICTMEMBER = 'restrictmember',
    LEAVE = 'LEAVE'
}

enum ROLES {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    DM = 'DM',
}




export const ChatHeader = () => {
    const [addmemberBtn, setAddMemberBtn] = useState(false);
    const [roleBtn, setRoleBtn] = useState(false)
    const [restrictBtn, setRestrictBtn] = useState(false);
    const [accessBtn, setAccessBtn] = useState(false)
    const [leaveBtn, setLeaveBtn] = useState(false)

    const [isDM, setIsDM] = useState(false);
    const navigate = useNavigate();

    const [addmemberPopUp, setAddMemberPopUp] = useState(false);
    const [rolePopUp, setRolePopUp] = useState(false)
    const [restrictPopUp, setRestrictPopUp] = useState(false);
    const [accessPopUp, setAccessPopUp] = useState(false)
    const [leavePopUp, setLeavePopUp] = useState(false)

    const [profile, setProfile] = useState('https://ui-avatars.com/api/?name=H&background=000&color=010');
    const [roomname, setRoomName] = useState('');
    const [activity, setActivity] = useState('');

    const [activepopup, setActivePopUp] = useState('')

    let activate = false;

    Currentsocket.on('roomenter', async (payload: any) => {
        if (activate == false) {
            ChatData.activeRoomId = payload.room.id;
            ChatData.activeRoomName = payload.room.name;
            ChatData.activeRoomType = payload.room.type;
            ChatData.activeRoomRole = payload.room.role;
            setProfile(payload.room.profile);
            showActions();
        }
        else {
            activate = true;
        }
    })



    const showpopup = (selected: string) => {
        setActivePopUp(selected);
        switch (selected) {
            case POPUPS.ADDMEMBER:
                setAddMemberPopUp(true);
                break;
            case POPUPS.UPDATEROLE:
                setRolePopUp(true);
                break;
            case POPUPS.UPDATEACCESS:
                setAccessPopUp(true);
                break;
            case POPUPS.RESTRICTMEMBER:
                setRestrictPopUp(true);
                break;
            case POPUPS.LEAVE:
                setLeavePopUp(true);
                break;
            default:
                break;
        }
    };

    const hidepopup = () => {
        switch (activepopup) {
            case POPUPS.ADDMEMBER:
                setAddMemberPopUp(false);
                break;
            case POPUPS.UPDATEROLE:
                setRolePopUp(false);
                break;
            case POPUPS.UPDATEACCESS:
                setAccessPopUp(false);
                break;
            case POPUPS.RESTRICTMEMBER:
                setRestrictPopUp(false);
                break;
            case POPUPS.LEAVE:
                setLeavePopUp(false);
                break;
            default:
                break;
        }
        setActivePopUp('');
    };

    const showActions = () => {

        setRoomName(ChatData.activeRoomName);
        switch (ChatData.activeRoomRole) {
            case ROLES.MEMBER:
                setAccessBtn(false);
                setRoleBtn(false);
                setAddMemberBtn(false);
                setRestrictBtn(false);
                setLeaveBtn(true);
                setIsDM(false);

                break;
            case ROLES.ADMIN:
                setAccessBtn(false);
                setRoleBtn(false);
                setLeaveBtn(true);
                setAddMemberBtn(true);
                setRestrictBtn(true);
                setIsDM(false);

                break;
            case (ROLES.OWNER):
                setLeaveBtn(true);
                setAddMemberBtn(true);
                setRestrictBtn(true);
                setAccessBtn(true);
                setRoleBtn(true);
                setIsDM(false);
                break;
            default:
                
                break;
        }

        changeProfile();
    }

    async function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }




    const changeProfile = () => {

        switch (ChatData.activeRoomType) {
            case ('DM'):
                setLeaveBtn(false);
                setIsDM(true);
                break;
            case "PROTECTED":
                setProfile('https://ui-avatars.com/api/?name=' + ChatData.activeRoomName + '&background=EB6144&color=EB6144&font-size=0.5')
                break;
            case "PRIVATE":
                setProfile('https://ui-avatars.com/api/?name=' + ChatData.activeRoomName + '&background=3E72EB&color=3E72EB&font-size=0.5')
                break;
            case "PUBLIC":
                setProfile('https://ui-avatars.com/api/?name=' + ChatData.activeRoomName + '&background=A2EB26&color=A2EB26&font-size=0.5')
                break;
            default:
                break;
        }
    }

    Currentsocket.on('chatclear', () => {
        setProfile('https://ui-avatars.com/api/?name=H&background=000&color=010');
        setRoomName('');
        setIsDM(false);

        setAddMemberBtn(false);
        setRoleBtn(false);
        setRestrictBtn(false);
        setAccessBtn(false);
        setLeaveBtn(false);
    })


    // <div className={activity}></div>

    return (
        <>
            <div className="chatbar">
                <div className="roominfo">
                    <img src={profile} alt="room profile" />
                    <span>{roomname}</span>
                    {isDM && <img className="invitegame" src="invite.png" alt="" onClick={() => navigate("/profile/" + ChatData.activeRoomName)}/>}
                    
                </div>
                <div className="roomactions">
                    {addmemberBtn && <img src="addmember.png" alt="add user" onClick={() => showpopup(POPUPS.ADDMEMBER)} />}
                    {roleBtn && <img src="role.png" alt="leave user" onClick={() => showpopup(POPUPS.UPDATEROLE)} />}
                    {accessBtn && <img src="access.png" alt="leave user" onClick={() => showpopup(POPUPS.UPDATEACCESS)} />}
                    {restrictBtn && <img src="restrict.png" alt="restrict user" onClick={() => showpopup(POPUPS.RESTRICTMEMBER)} />}
                    {leaveBtn && <img src="leave.png" alt="leave user" onClick={() => showpopup(POPUPS.LEAVE)} />}




                </div>
            </div>
            {addmemberPopUp && <AddMemberPopUp hidepopup={hidepopup} />}
            {rolePopUp && <RolePopUp hidepopup={hidepopup} />}
            {accessPopUp && <AccessPopUp hidepopup={hidepopup} />}
            {restrictPopUp && <RestrictPopUp hidepopup={hidepopup} />}
            {leavePopUp && <LeavePopUp hidepopup={hidepopup} />}
        </>
    );
}