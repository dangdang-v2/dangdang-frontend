import React, { useRef, useEffect, useState } from 'react'

const MainMap = ()=> {
    const kakaoAPI = window.kakao.maps
    const [map, setMap] = useState()

    const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakaoAPI.LatLng(37.8095723, 126.7665777), //지도의 중심좌표.
        level: 6, //지도의 레벨(확대, 축소 정도)
    }

    const container = useRef(null) //지도를 담을 영역의 DOM 레퍼런스

    useEffect(() => {
        setMap(new kakaoAPI.Map(container.current, options)) //지도 생성 및 객체 리턴

    }, [])

    if (navigator.geolocation) {
    
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakaoAPI.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
            
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
                
          });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        var locPosition = new kakaoAPI.LatLng(33.450701, 126.570667),    
            message = 'geolocation을 사용할수 없어요..'
            
        displayMarker(locPosition, message);
    }
    
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
    
        // 마커를 생성합니다
        var marker = new kakaoAPI.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
    
        // 인포윈도우를 생성합니다
        var infowindow = new kakaoAPI.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);}

    return (
        <div>
            <div
                className="map"
                style={{ width: "500px", height: "500px" }}
                ref={container}
            ></div>            
        </div>
  )
}

export default MainMap