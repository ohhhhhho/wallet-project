import UserInfo from "../types/userInfo";
import CryptoJS from 'crypto-js';

export const ensryptUserData = ({id, password, mnemonic, privateKey, publicKey, address, createdAt}:UserInfo) => {
    return{
        id: id ? CryptoJS.AES.encrypt(id, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        password: password ? CryptoJS.AES.encrypt(password, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        mnemonic: mnemonic ? CryptoJS.AES.encrypt(mnemonic, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        publicKey: publicKey ? CryptoJS.AES.encrypt(publicKey, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        privateKey: privateKey ? CryptoJS.AES.encrypt(privateKey, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        address: address ? CryptoJS.AES.encrypt(address, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
        createdAt: createdAt ? CryptoJS.AES.encrypt(createdAt, process.env.REACT_APP_PASSWORD_SECRET_KEY || '').toString() : '',
    }
}