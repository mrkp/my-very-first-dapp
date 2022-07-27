import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers';

import {useState, useEffect} from "react";

const ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract('0xD1F8446Ec0abbdFD84a06Ac342191fabfD2222b5', ABI, provider);
const signer = provider.getSigner();

function App() {

  const [account, setAccount] = useState('');
  const [number, setNumber] = useState(null);
  const [contractNumber, setContractNumber] = useState(null)

  useEffect(() => {
    connectToMetamask();
  }, [])

  const connectToMetamask = async () => {
    const accounts = await provider.send("eth_requestAccounts", [])
    setAccount(accounts[0]);
  }

  const retrieve = async () => {
    const _number = await contract.retrieve();
    setNumber(parseInt(_number))
  }

  const setVariable = async () => {

    const storageWithSigner = contract.connect(signer);
    const _number = parseInt(contractNumber);
    const result = await storageWithSigner.store(_number);
    console.log('result: ', result);

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{account}</h2>
        <br/>
        <h2>{number}</h2>
        <button onClick={retrieve}>Retrieve</button>
        <br/>
        <input type="text" onChange={e => setContractNumber(e.target.value)}/>
        <br/>
        <button onClick={setVariable}>Set Number</button>
      </header>
    </div>
  );
}

export default App;
