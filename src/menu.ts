import { app, Menu, MenuItemConstructorOptions, dialog, BrowserWindow } from 'electron';
import { logger } from './log'
const isMac = process.platform === 'darwin'

const appMenu: MenuItemConstructorOptions= {
    label: app.name,
    submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
    ]
}

const fileMenu: MenuItemConstructorOptions= {
    label: 'File',
    submenu: [
        {
            label: 'Open',
            click: async () => {
                dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
                    properties: ['openFile'],
                    filters: [
                        {
                            extensions: ["cdt"],
                            name: "Clustered Data Files"
                        },{
                            extensions: ["*"],
                            name: "All Files"
                        }

                    ]
                }).then(files => {
                    if (files !== undefined && !files.canceled && files.filePaths.length > 0) {
                        const selectedCdt = files.filePaths[0];
                        logger.info(`opening file ${selectedCdt}`)
                    }
                });
                
            }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
    ]
}

const editMenu: MenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
            { role: 'pasteAndMatchStyle' } as MenuItemConstructorOptions,
            { role: 'delete' } as MenuItemConstructorOptions,
            { role: 'selectAll' } as MenuItemConstructorOptions,
            { type: 'separator' } as MenuItemConstructorOptions,
            {
                label: 'Speech',
                submenu: [
                    { role: 'startSpeaking' } as MenuItemConstructorOptions,
                    { role: 'stopSpeaking' } as MenuItemConstructorOptions
                ]
            }
        ] : [
            { role: 'delete' } as MenuItemConstructorOptions,
            { type: 'separator' } as MenuItemConstructorOptions,
            { role: 'selectAll' } as MenuItemConstructorOptions
        ])
    ]
}

const viewMenu: MenuItemConstructorOptions = {
    label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
}

const windowMenu: MenuItemConstructorOptions = {
    label: 'Window',
    submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
            { type: 'separator' } as MenuItemConstructorOptions,
            { role: 'front' } as MenuItemConstructorOptions,
            { type: 'separator' } as MenuItemConstructorOptions,
            { role: 'window' } as MenuItemConstructorOptions
        ] : [
            { role: 'close' } as MenuItemConstructorOptions
        ])
    ]
}
const helpMenu: MenuItemConstructorOptions = {
    role: 'help',
    submenu: [
        {
            label: 'Learn More',
            click: async () => {
                const { shell } = require('electron')
                await shell.openExternal('https://electronjs.org')
            }
        }
    ]
}
const template = [
    ...(isMac ? [appMenu] : []),
    fileMenu,
    editMenu,
    viewMenu,
    windowMenu,
    helpMenu
]
export function setMenuFromTemplate() {
    const menu = Menu.buildFromTemplate(template)
    return menu
}
