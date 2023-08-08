/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        
        
        
        {
            label: 'PYPS',
            items: [
                { label: 'Departman Tablosu', icon: 'pi pi-fw pi-table', to: '/PYBS/Department' },
                
                { label: 'Proje Tablosu', icon: 'pi pi-fw pi-table', to: '/PYBS/Project' },
                { label: 'Çalışan Tablosu', icon: 'pi pi-fw pi-table', to: '/PYBS/Employee' },
             //   { label: 'Belge Tablosu', icon: 'pi pi-fw pi-table', to: '/PYBS/File' }
               
            ]
        },
        
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
