"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import {
  Button,
  CardFooter
} from "@nextui-org/react"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ScrollToTopButton from '@/components/totopbtn';
import { useState, useEffect } from "react";

import {api_bet_list, api_bet_search,api_bet_new } from "@/core/request"

import configData from "@/core/config"

import { useRouter } from 'next/router';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "@solana/wallet-adapter-react-ui";


import { FaShare ,FaTwitterSquare } from "react-icons/fa";

import * as bs58 from "bs58"
export default function IndexPage() {

  const cfg = JSON.parse(JSON.stringify(configData))
  const { connected, publicKey, signMessage } = useWallet();
  const { setVisible } = useWalletModal();
  const [isSearch, setIsSearch] = useState(false);
  const [inputData, setInputData] = useState("");
  const [initLock, setInitLock] = useState(false);
  const [bets, setBets] = useState(
    [
      {
        "id":"",
        "image":"/logo.png",
        "token": "$link",
        "address":"",
        "types": "price_lever_to_n",
        "bets": "10",
        "deadline": "default",
        "bet": "Will $link leverage to 10X ?"
      },
    ]
  )
  

  const router = useRouter();

  
  useEffect(() => {
    
    setIsSearch(false)
    const onList = async ()=>
      {
        const list = await api_bet_list(1,10)
        let dataList: any[] = [];
        if(!list)
        {
          return false;
        }

        list.data.forEach((ele:any) => {
          if(ele?.name && ele.token && ele.tokenInfo?.img,ele.id)
          {
            dataList.push(
              {
                "id":ele.id,
                "image":ele.tokenInfo?.img,
                "token": ele.token,
                "address":ele.address,
                "types":  ele.types,
                "bets": ele.final,
                "deadline": ele.deadline,
                "bet":ele.final,
              }
            )
          }

        });
        console.log("dataList",dataList)
        setBets(dataList);
      }
    const onSearch = async (id:string)=>
    {
      const search = await api_bet_search(id)
      let dataList: any[] = [];
      if(!search)
      {
        return false;
      }

      const ele = search.data

      if(ele?.name && ele.token && ele.tokenInfo?.img,ele.id)
        {
          dataList.push(
            {
              "id":ele.id,
              "image":ele.tokenInfo?.img,
              "token": ele.token,
              "address":ele.address,
              "types":  ele.types,
              "bets": ele.final,
              "deadline": ele.deadline,
              "bet":ele.final,
            }
          )
        }

      setBets(dataList);
      setIsSearch(true)
    }

    const init = async ()=>
    {
      const params = new URLSearchParams(location.href)
      let id = "";
      params.forEach(e => {
        id = e
    });
      console.log(
        "init",id,params,location.href
      )

      if(id)
      {
        onSearch(id as string).catch()
      }else{
        onList().catch()
      }
  
    }

    if(!initLock)
    {
      init().catch()
      setInitLock(true)
      
    }
    

    console.log(
      "useEffect"
    )
  }

)

const searchId = async (id:string)=>
  {
    console.log("Search the bet ::",id)
    const search = await api_bet_search(id)
    console.log(search)
    let dataList: any[] = [];
    if(!search)
    {
      return false;
    }

    const ele = search.data
    
    if(ele?.name && ele.token && ele.tokenInfo?.img,ele.id)
      {
        dataList.push(
          {
            "id":ele.id,
            "image":ele.tokenInfo?.img,
            "token": ele.token,
            "types":  ele.types,
            "bets": ele.final,
            "deadline": ele.deadline,
            "bet":ele.final,
          }
        )
      }

    console.log(dataList)
    setBets(dataList);
    setIsSearch(true)
  }
const betButtonGenerator = (t:any) =>
{
  // console.log(t)
  if(t && cfg['betTyep'][t])
  {
    return (
      <div className="w-full">

      <div className="w-full flex ">
      <Snippet hideCopyButton hideSymbol variant="bordered">
        <span>
          $120 | 1.2x
        </span>
      </Snippet>
      <Button className="w-full" color="danger"> {cfg['betTyep'][t][0].name} </Button>
      </div>
      
      <div className="w-full flex ">
      <Snippet hideCopyButton hideSymbol variant="bordered">
        <span>
          $90 | 3.5x
        </span>
      </Snippet>
      <Button className="w-full flex " color="success"> {cfg['betTyep'][t][1].name} </Button>
      </div>

      </div>
    )
  }
  return <div></div>;
}

const newBet = async() =>
{
  console.log("Input data ::",inputData);
  if(inputData && inputData.length>3)
  {
    if(connected && publicKey && signMessage)
    {
      
      try {
        const signature = await signMessage(new TextEncoder().encode(inputData));
        console.log('Signature:', bs58.default.encode(signature));
        const newBetPlace = await api_bet_new(
          inputData,
          bs58.default.encode(signature)
        )
        console.log("Bet place ret ::",newBetPlace)
        if(newBetPlace && newBetPlace?.code == 200 && newBetPlace.data.id )
        {
          // router.push('/?id='+newBetPlace.data.id);
          await searchId(newBetPlace.data.id)
        }
      } catch (error) {
        console.error('Message signing failed:', error);
      }
    }else{
      setVisible(true);
    }

  }
}

  return (
    <DefaultLayout>
      <ScrollToTopButton/>

      {
        isSearch?null:
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
         <span className={title()}>🎲</span> <span className={title({ color: "violet" })}>PumpBet &nbsp;</span>
          <div className={subtitle({ class: "mt-4" })}>
           First AI-Agent driven solana memecoin bets protocol
           
          </div>
        </div>
        <div className="mt-8">
         
    <Input
      aria-label="AI"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="eg : $pumpbets will reach the king of hill !"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      style={{minWidth:'400px' , width:"40%"}}
      onChange={
        (e:any) => { setInputData(e.currentTarget.value); }
      }
    />
          
        </div>
        <div className="flex gap-3">

          <Button
          onClick={newBet}
                      className={buttonStyles({
                        color: "primary",
                        radius: "full",
                        variant: "shadow",
                      })}
          
          >
            Tell me your bet ?
          </Button>
        </div>
      </section>
      }


      <div style={{ width:"100"}}>  
          <div className="w-full flex ">
          <div className="w-full">
          <span className={title()}>🚀</span> <span className="text-3xl">Bet me ! </span>
          </div>
          
          <div style={{ minWidth:"150px" , maxWidth:"400px", width:"30%"}}>
          <Input
            aria-label="AI"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Token name or address"
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            
          />
          </div>

          </div>

            <div className="maingrid">
              {bets.map((item:any, index:any) => (

                <div className="maingriditem" key={index+item.id}>
                      <Card className="py-4">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">

                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={item.image}
                          width={'100%'}
                        />
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                      <h4 className="font-bold text-large">🎲 {item.bet}</h4>
                      <p className="text-tiny uppercase font-bold">{item.token}</p>
                      <small className="text-default-500"> <a
                      href={"http://pump.fun/"+item.address}
                      >${item.types}</a></small>


                      {betButtonGenerator(item.types)}
                      
                      </CardBody>
                      <CardFooter>
                        <div style={{width:"100%" ,display:"flex",flexDirection:"row",  textAlign:"center" , gap :"10px"}}>
                          <small>Ends in : 30 H</small>
                          <Link isExternal href={siteConfig.links.redirect + "?id="+item.id} >
                            <FaShare/>
                          </Link>
                          <Link isExternal href={"https://twitter.com/intent/tweet?text="+item.bets+" : "+encodeURIComponent(siteConfig.links.redirect + "?id="+item.id)} >
                            <FaTwitterSquare/>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                </div>
                
              ))}
            </div>
      </div>
    </DefaultLayout>
  );
}
