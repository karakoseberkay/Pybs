

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`https://www.cankayaelektronik.com/image/genel/big/urun6a.jpg`} alt="Logo" height="55" className="mr-2" />
            by
            <span className="font-medium ml-2">GIRNATA</span>
        </div>
    );
};

export default AppFooter;
