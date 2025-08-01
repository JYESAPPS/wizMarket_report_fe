import React from "react";
import Home from "../assests/menu/home.png";
import HomeActive from "../assests/menu/homeActive.png";
import Reserve from "../assests/menu/reserve.png";
import ReserveActive from "../assests/menu/reserveActive.png";
import Report from "../assests/menu/report.png";
import ReportActive from "../assests/menu/reportActive.png"
import Mypage from "../assests/menu/mypage.png";
import MypageActive from "../assests/menu/mypageActive.png"

const menuList = [
    { key: "home", label: "홈", icon: Home, activeIcon: HomeActive },
    { key: "reserve", label: "광고예약", icon: Reserve, activeIcon: ReserveActive },
    { key: "report", label: "리포트", icon: Report, activeIcon: ReportActive },
    { key: "mypage", label: "마이페이지", icon: Mypage, activeIcon: MypageActive },
];

const MenuBar = ({ tab, setTab }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg py-2 px-4 flex justify-between items-center w-full">
            {menuList.map((item) => {
                const isActive = item.key === tab;

                return (
                    <div
                        key={item.key}
                        onClick={() => setTab(item.key)}
                        className="flex flex-col items-center flex-1 cursor-pointer"
                    >
                        <img
                            src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                            alt={`${item.label} 아이콘`}
                            className="pb-1"
                        />
                        <span className={`text-xs font-medium pt-2 ${isActive ? "text-[#7864F9]" : "text-gray-600"}`}>
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default MenuBar;
