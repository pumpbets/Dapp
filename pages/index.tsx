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

import {api_bet_list } from "@/core/request"

export default function IndexPage() {
  const [isSearch, setIsSearch] = useState(false);
  const [bets, setBets] = useState(
    [
      {
        "id":"",
        "image":"/logo.png",
        "token": "$link",
        "types": "price_lever_to_n",
        "bets": "10",
        "deadline": "default",
        "bet": "Will $link leverage to 10X ?"
      },
    ]
  )

  useEffect(() => {
    const onLoad = async ()=>
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
                "types":  ele.type,
                "bets": ele.final,
                "deadline": ele.deadline,
                "bet":ele.final,
              }
            )
          }

        });

        setBets(dataList);
      }

      onLoad().catch()
  }

)

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
    />
          
        </div>
        <div className="flex gap-3">

          <Button
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

                <div className="maingriditem">
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
                      <small className="text-default-500">12 Tracks</small>
                      <div className="w-full flex ">
                      <Snippet hideCopyButton hideSymbol variant="bordered">
                        <span>
                          $120 | 1.2x
                        </span>
                      </Snippet>
                      <Button className="w-full" color="danger"> Yes</Button>
                      </div>
                      
                      <div className="w-full flex ">
                      <Snippet hideCopyButton hideSymbol variant="bordered">
                        <span>
                          $90 | 3.5x
                        </span>
                      </Snippet>
                      <Button className="w-full flex " color="success"> No</Button>
                      </div>

                      
                      </CardBody>
                      <CardFooter>
                        <div style={{width:"100%" , textAlign:"right"}}>
                          <small>Ends in : 30 H</small>
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
