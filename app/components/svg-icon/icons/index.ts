import { Bell } from './bell'
import { Send } from './send'
import { Search } from './search'
import { ChevronDown } from './chevron-down'
import { ChevronRight } from './chevron-right'
import { ChevronLeft } from './chevron-left'
import { Cross } from './cross'
import { Dots } from './dots'
import { Star } from './star'
import { Order } from './order'
import { Hi } from './hi'
import { UserCircle } from './user-circle'
import { SettingsCircle } from './settings-circle'
import {
  Babysitting,
  Cleaning,
  Electrical,
  FurnitureAssembly,
  Handyman,
  HeavyLifting,
  LawnCare,
  Moving,
  Painter,
  PersonalTrainer,
  PetCare,
  Plumbing,
  SnowRemoval,
  Tutoring,
  TvMounting,
  YardWork,
} from './job-categories'
import { Calendar } from './calendar'
import { Wallet } from './wallet'
import { Loop } from './loop'
import { Done } from './done'
import { UserDouble } from './user-double'
import { Valise } from './valise'
import { Checked } from './checked'
import { Filter } from './filter'
import { Like } from './like'
import { Archive } from './archive'
import { Online } from './online'
import { Oclock } from './oclock'
import { Time } from './time'
import { MapMark } from './map-mark'
import { SendMessage } from './send-message'
import { Online2 } from './online2'
import { Protect } from './protect'
import { Pen } from './pen'
import { User2 } from './user2'
import { Mail } from './mail'
import { Phone } from './phone'
import { MapMark2 } from './map-mark2'
import { Bag } from './bag'
import { Attachment } from './attachment'
import { ExclamationSign } from './exclamationSign'
import { MessageCircle } from './message-circle'
import { File } from './file'
import { Image } from './image'
import { Sliders } from './sliders'
import { Trash } from './trash'
import { CheckInCircle } from './check-in-circle'
import { SadSmile } from './sad-smile'
import { UserWithX } from './user-with-x'
import { Home } from './home'
import { Tablet } from './tablet'
import { CrossInPentagon } from './cross-in-pentagon'
import { CrossInSquare } from './cross-in-square'
import { ArrowRight } from './arrow-right'
import { Pause } from './pause'
import { Start } from './start'
import { Paper } from './paper'
import { SoftStar } from './soft-star'
import { BorderStar } from './border-star'
import { Warning } from './warning'
import { Report } from './report'
import { Key } from './key'
import { Bank } from './bank'
import { FiEye } from './fi-eye'
import { CrossInCirlce } from './cross-in-circle'
import { ArrowRight2 } from './arrow-right2'
import { UserAndCross } from './user-and-cross'
import { FinishProfile } from './finish-profile'
import { WarningInPentagon } from './warningInPentagon'
import { Like2 } from './like2'
import { Warn } from './warn'
import { BadSmile } from './bad-smile'
import { AppLogo } from './app-logo'
import { Google } from './google'
import { Fb } from './fb'
import { Paypal } from './paypal'
import { Visa } from './visa'

export const icons = {
  bell: Bell,
  send: Send,
  search: Search,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  cross: Cross,
  dots: Dots,
  star: Star,
  order: Order,
  hi: Hi,
  userCircle: UserCircle,
  settingsCircle: SettingsCircle,
  calendar: Calendar,
  wallet: Wallet,
  loop: Loop,
  done: Done,
  userDouble: UserDouble,
  valise: Valise,
  checked: Checked,
  filter: Filter,
  like: Like,
  archive: Archive,
  online: Online,
  oclock: Oclock,
  time: Time,
  mapMark: MapMark,
  sendMessage: SendMessage,
  online2: Online2,
  protect: Protect,
  pen: Pen,
  user2: User2,
  mail: Mail,
  phone: Phone,
  mapMark2: MapMark2,
  bag: Bag,
  attachment: Attachment,
  exclamationSign: ExclamationSign,
  messageCircle: MessageCircle,
  file: File,
  image: Image,
  sliders: Sliders,
  trash: Trash,
  checkInCircle: CheckInCircle,
  sadSmile: SadSmile,
  userWithX: UserWithX,
  home: Home,
  tablet: Tablet,
  crossInPentagon: CrossInPentagon,
  crossInSquare: CrossInSquare,
  arrowRight: ArrowRight,
  pause: Pause,
  start: Start,
  paper: Paper,
  softStar: SoftStar,
  borderStar: BorderStar,
  warning: Warning,
  report: Report,
  key: Key,
  bank: Bank,
  fieye: FiEye,
  crossInCirlce: CrossInCirlce,
  arrowRight2: ArrowRight2,
  userAndCross: UserAndCross,
  finishProfile: FinishProfile,
  warningInPentagon: WarningInPentagon,
  like2: Like2,
  warn: Warn,
  badSmile: BadSmile,
  appLogo: AppLogo,
  google: Google,
  fb: Fb,
  paypal: Paypal,
  visa: Visa,

  // job categories
  tutoring: Tutoring,
  babysitting: Babysitting,
  cleaning: Cleaning,
  electrical: Electrical,
  furnitureAssembly: FurnitureAssembly,
  handyman: Handyman,
  heavyLifting: HeavyLifting,
  lawnCare: LawnCare,
  moving: Moving,
  painter: Painter,
  personalTrainer: PersonalTrainer,
  petCare: PetCare,
  plumbing: Plumbing,
  snowRemoval: SnowRemoval,
  tvMounting: TvMounting,
  yardWork: YardWork,
}

export type IconTypes = keyof typeof icons
