//frontend
import { IoLogoCss3 } from 'react-icons/io'
import { IoLogoHtml5 } from 'react-icons/io'
import { FaReact } from 'react-icons/fa'
import { TbBrandJavascript } from 'react-icons/tb'
import { RiVuejsLine } from 'react-icons/ri'
import { BsGridFill } from 'react-icons/bs'
import { SiVisualstudiocode } from 'react-icons/si'
import { DiAngularSimple } from 'react-icons/di'
import { BsGithub } from 'react-icons/bs'
import { TbBrandBootstrap } from 'react-icons/tb'
import { RiNpmjsFill } from 'react-icons/ri'
import { TbBrandRedux } from 'react-icons/tb'
//python & backend
import { SiPython } from 'react-icons/si'
import { DiDjango } from 'react-icons/di'
import { TbBrandDjango } from 'react-icons/tb'
import { SiMicropython } from 'react-icons/si'
import { GrNode } from 'react-icons/gr'
import { SiExpress } from 'react-icons/si'
import { SiMongodb } from 'react-icons/si'
import { GrMysql } from 'react-icons/gr'
import { SiPhp } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'
//security
import { MdSecurity } from 'react-icons/md'
import { MdSecurityUpdateWarning } from 'react-icons/md'
import { DiJavascript1 } from 'react-icons/di'
import { TbBrandPython } from 'react-icons/tb'

//softskills
import { GiSkills } from 'react-icons/gi'
import { MdAttachMoney } from 'react-icons/md'
import { GiSandsOfTime } from 'react-icons/gi'
import { RiTeamFill } from 'react-icons/ri'


const fontend ={
  title:' دوره های فرانت اند',
  icons : [
    { icon: <RiVuejsLine />, color: '#7DE5C3' },
    { icon: <DiAngularSimple />, color: '#BD002E' },
    { icon: <FaReact />, color: '#07A9CA' },
    { icon: <TbBrandJavascript />, color: '#fb9725' },
    { icon: <IoLogoCss3 />, color: '#07A9CA' },
    { icon: <IoLogoHtml5 />, color: '#fcb72e' },
    { icon: <BsGridFill />, color: '#ffff76' },
    { icon: <SiVisualstudiocode />, color: '#CA8AF5' },
    { icon: <RiNpmjsFill />, color: '#C60001' },
    { icon: <TbBrandBootstrap />, color: '#7010EF' },
    { icon: <BsGithub />, color: '#FF6D60' },
    { icon: <TbBrandRedux />, color: '#764ABC' },
  ]
}

const python ={
  title:' دوره های  بک اند',
  icons : [
    { icon: <SiPython />, color: '#4CB6E7' },
    { icon: <DiDjango />, color: '#CB1B02' },
    { icon: <TbBrandDjango />, color: '#07A9CA' },
    { icon: <SiMicropython />, color: '#A7D129' },
    { icon: <GrNode />, color: '#53A143' },
    { icon: <SiExpress />, color: '#FFD52E' },
    { icon: <SiMongodb />, color: '#10924E' },
    { icon: <FaReact />, color: '#07A9CA' },
    { icon: <GrMysql />, color: '#F1C99E' },
    { icon: <SiPhp />, color: '#5D7DB8' },
    { icon: <FaJava />, color: '#ffff76' },
    { icon: <IoLogoJavascript />, color: '#F5C700' },
   
  
  ]
}
const security ={
  title:' دوره های  امنیت',
  icons : [
    { icon: <MdSecurity />, color: '#2BC087' },
    { icon: <MdSecurityUpdateWarning />, color: '#F05454' },
    { icon: <DiJavascript1 />, color: '#fb9725' },
    { icon: <TbBrandPython />, color: '#07A9CA' },
  
  ]
}
const softSkills ={
  title:'  مهارت های نرم  ',
  icons :[
    { icon: <GiSkills />, color: '#F4ABC4' },
    { icon: <MdAttachMoney />, color: '#E90064' },
    { icon: <GiSandsOfTime />, color: '#A7D129' },
    { icon: <RiTeamFill />, color: 'red' },

  ]
}


  export {fontend,python,security,softSkills}