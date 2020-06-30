console.log('main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let win;
// UI 표시할 창으로 쓸 변수

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
        // 창을 닫는것과 동시에 가비지컬렉터 기능도.
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
// 모든 창이 닫히면 앱실행을 종료

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
// 이건 맥에서 쓰는사람을 위한 코드. 창이 없을때 아이콘 클릭하면 창을 켜줌

