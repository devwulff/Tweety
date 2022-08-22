import ProfilePic from "../ProfilePic";
import {
    DisplayFlex,
    DisplayIcon,
    FollowerStats,
    FullName,
    Header, InfoIcon, ListIcon, LogOutIcon,
    Navigation, NavigationContainer,
    NavItems, ProfileIcon,
    StatsFlex,
    UserInfo,
    UserName,
    Wrapper
} from "./SlideIn.styling";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {loggedInUser, slideInMenu} from "../../utils/SharedStates";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

const SlideIn = () => {
    const [userData, setUserData] = useRecoilState(loggedInUser);
    const [showMenu, setShowMenu] = useRecoilState(slideInMenu);
    const [userInfo, setUserInfo] = useState({});
    const wrapperRef = useRef(null);
    const navigator = useNavigate();

    const axiosOptions = {
        headers: {
            token: `JWT ` + userData?.accessToken
        }
    }
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        if (!userData) return;
        const getUserInfos = async () => {
            const response = await axios.get(apiLink + '/users/profileshort', axiosOptions);
            setUserInfo(response.data);
        }
        getUserInfos();
    }, [userData])

    const toProfile = () => {
        setShowMenu(false);
        navigator(`/profile/${userData.userId}`)
    }

    const toFollowerList = () => {
        setShowMenu(false);
        navigator(`/followerlist/${userData.userId}/following`);
    }

    const logoutHandler = () => {
        setUserData({});
        setShowMenu(false);
        localStorage.clear();
        navigator('/')
    }

    return <Wrapper showMenu={showMenu} ref={wrapperRef}>
        <Header>
            <h3>Account Info</h3>
            <span onClick={() => setShowMenu(false)}>X</span>
        </Header>
        <UserInfo>
            <ProfilePic src={userInfo.profilePictureLink}/>
            <FullName>{userInfo.firstName} {userInfo.lastName}</FullName>
            <UserName>@{userInfo.username}</UserName>
            <FollowerStats>
                <StatsFlex><span>{userInfo.following}</span><p>Following</p></StatsFlex>
                <StatsFlex><span>{userInfo.followedBy}</span><p>{userInfo.followedBy === 1 ? 'Follower' : 'Followers'}</p></StatsFlex>
            </FollowerStats>
        </UserInfo>
        <NavigationContainer>
            <Navigation>
                <NavItems onClick={toProfile}><ProfileIcon size={24}/><span>Profile</span></NavItems>
                <NavItems onClick={toFollowerList} ><ListIcon size={24}></ListIcon><span>Followerlist</span></NavItems>
            </Navigation>
            <Navigation>
                <NavItems><InfoIcon size={24}/><span>About Tweety</span></NavItems>
            </Navigation>
            <Navigation>
                <NavItems><DisplayIcon size={24}/>
                    <DisplayFlex><span>Dark Mode</span><input type="checkbox"/></DisplayFlex>
                </NavItems>
                <NavItems onClick={logoutHandler}>
                    <LogOutIcon size={24}/> <span>Logout</span>
                </NavItems>
            </Navigation>
        </NavigationContainer>
    </Wrapper>
}

export default SlideIn;