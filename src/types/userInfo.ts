export default interface UserInfo {
    id: string;
    password: string;
    mnemonic: string;
    publicKey: string;
    privateKey: string;
    address?: string;
    createdAt: string;
}

