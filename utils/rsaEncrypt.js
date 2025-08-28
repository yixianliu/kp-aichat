//jsencrypt需要引入，不同端可以采用不同的方式引入
//uniapp端可以使用插件（查看官网使用详情），vue端可以使用 npm install jsencrypt 来引入，这里我们使用vue端来展示
import JSEncrypt from "jsencrypt";
// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey = "公钥";

const privateKey = "私钥";

// 加密
export function encrypt(txt) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey); // 设置公钥
    return encryptor.encrypt(txt); // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(privateKey);
    return encryptor.decrypt(txt);
}