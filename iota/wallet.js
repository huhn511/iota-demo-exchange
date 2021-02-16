const { AccountManager, StorageType } = require('@iota/wallet');
require('dotenv').config()


async function init() {

}


async function create_account(user_id) {

    
    // Setup IOTA Wallet Library
    let manager = new AccountManager({
        storagePath: './sh-storage',
        storageType: StorageType.Stronghold
    })
    manager.setStrongholdPassword("sdsd")

    let account = await manager.createAccount({
        alias: user_id,
        clientOptions: { node: 'http://api.lb-0.testnet.chrysalis2.com', localPow: false }
    })

    // Always sync before doing anything with the account
    console.log('Syncing...')
    const synced = await account.sync()
    console.log('Synced!')
    console.log('Account Created!')
    
    return account;
}

async function get_balance() {
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')
    let balance = account.balance().available
    console.log('available balance', balance)
    return balance;
}

async function get_address() {
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')


    const addresses = account.listAddresses(true) // true =  unspent addresses
    let unspent_addr = '';
    if(addresses.length == 0) {
        unspent_addr = account.generateAddress().address
    } else {
        unspent_addr = addresses[0].address
    }
    console.log('Need a refill? Send it this address:', unspent_addr)
    

    return unspent_addr;
}

module.exports = {
    init,
    create_account
};