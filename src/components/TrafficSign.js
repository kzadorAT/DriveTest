import React from "react";

const TrafficSign = ({ signImage }) => {
    return (
        <div>
            <img src={signImage} alt="Traffic Sign" style={{ width:  '150px', height: '150px' }} />
        </div>
    );
};

export default TrafficSign;