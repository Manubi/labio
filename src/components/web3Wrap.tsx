import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export const TransactionContext = React.createContext({} as any);

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState(null)
   
    const checkIfWalletConnected = async () => {
        try {
            if(!window.ethereum) return alert("Please install metamask")
            console.log("check window ethereum: ", window.ethereum)
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    
            if (accounts.length) {
                setConnectedAccount(accounts[0]);
            } else {
                console.log('No accounts found')
            }
            console.log("Log accounts: ", accounts)
        } catch (error) {
            console.log(error)
        }
    }

    // const checkIfWalletChanged = async () => {
    //     ethereum.on('accountsChanged', function (accounts) {
    //         getAccount();
    //     })
    // }
    
    useEffect(() =>{
        checkIfWalletConnected()
    },[connectedAccount])
    
    const connectWallet = async () => {
        try {
            if(!window.ethereum) return alert("Please install metamask")
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setConnectedAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object.')
        }
    }
    return (
      <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
          {children}
      </TransactionContext.Provider>
  )
}