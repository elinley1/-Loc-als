import React from "react";

export const Select = props => (
    <select  {...props} style={{ float: "left", marginBottom: 10 }} className="custom-select" id="seclect1">
        {props.children}
    </select >
);