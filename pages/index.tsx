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
  Button
} from "@nextui-org/react"

export default function IndexPage() {
  return (
    <DefaultLayout>
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

      <div style={{backgroundColor:"white",width:"100"}}>  
            <div className="maingrid">
              {[1,2,3,4,5,6,7,8].map((item:any, index:any) => (
                <p className="maingriditem">index</p>
              ))}
            </div>
      </div>
    </DefaultLayout>
  );
}
