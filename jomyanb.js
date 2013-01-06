// -*- coding: utf-8; -*-
// This is Public Domain Software: nobody can have any copyright with this.
// Distribution and improvement of this software are strongly encouraged.
/*
ミャンマー語を初声・中声・終声に分解・合成するための道具作り

関数
bool isUnicodeChar(char)
bool isJasoConsonantChar(char)
bool isJasoVowelChar(char)
bool isJasoChar(char)
bool isConsonantKey(key)
bool isVowelKey(key)
bool isJasoKey(key)
int  johabFirstFromKeyToCode(keys) //変換できなければ -1 を返す
int  johabSecondFromKeyToCode(keys) //変換できなければ -1 を返す
int  johabThirdFromKeyToCode(keys) //変換できなければ -1 を返す
int  jasoFromKeyToCode(keys) //変換できなければ -1 を返す
bool isJohabFirstKey(keys)
bool isJohabSecondKey(keys)
bool isJohabThirdKey(keys)
bool isJohabJasoKey(keys)
char jasoFromCodeToChar(code)
char jasoFromKeyToChar(keys)
char johabFromThreeCodeToChar(first_code, second_code, third_code)
str  unicodePlusJasoKey(unicodeChar, jasoKey)
str  unicodePlusJasoKey_ai(unicodeChar, jasoKey)
str  jasoPlusJasoKey(jasoChar, jasoKey)
str  strPlusJasoKey(str, jasoKey)
str  strPlusJasoKey_ai(str, jasoKey)
str  strPlusJasoKeyString(str, jasoKeyString)
str  strDeleteOneJaso(str)
str  toMyanmarKeyAll(str)

クラス 
コンストラクタ
ClassJohabFromChar(char)
ClassJohabFromKey(first_key, second_key, third_key)
メソッド
char toChar()
keys getFirstKey()
keys getSecondKey()
keys getThirdKey()
code getFirstCode()
code getSecondCode()
code getThirdCode()
void setFirstKey(keys)
void setSecondKey(keys)
void setThirdKey(keys)
void setFirstCode(code)
void setSecondCode(code)
void setThirdCode(code)
void deleteOneJaso()

クラス
コンストラクタ
ClassJohabFromJasoChar(jasoChar) 
メソッド
char toChar()
keys getJasoKey()
code getJasoCode()
void setJasoKey(keys)
void setJasoCode(code)
void deleteOneJaso()
*/

johabFirstTable = new Array(
  "k",//က
  "kh",//ခ
  "g",//ဂ
  "gh",//ဃ
  "ng",//င
  "s",//စ
  "ss",//ဆ
  "z",//ဇ
  "zh",//ဈ
  "ny",//ဉ
  "tt",//ဋ
  "dh",//ဍ
  "ht",//ဥ
  "d",//ၒ
  "nh",//ဏ
  "t",//တ
  "ht",//ထ
  "d",//ဒ
  "dh" //ဓ
  "n",//န
  "p",//ပ
  "ph",//ဖ
  "v",//ဗ
  "b",//ဘ
  "m",//မ
  "yh",//ယ
  "y",//ရ
  "l",//လ
  "w",//ဝ
  "th",//သ
  "h",//ဟ
  "n",//ဠ
  "",//အ
  "",//ဥ  
  "ane",//ိန်:
  "ate",//ုန်
  "ane",//ုန့်
  "one",//ုန်:
  "at",//ပ်
  "ate",//ိပ်
  "ote",//ုပ်
  "at",//ောပ်
  "at",//ဗ်
  "ait",//ိဗ်
  "ote",//ုဗ်
  "at",//ာဘ်
                            "an",//မ်
                            "amt",//မ့်
                            "eint",//ီမ့်
                            "ann",//မ်:
                            "ain",//ိမ်
                            "aint",//ိမ့်
                            "ane" //ိမ်:
                            "one",//ုမ်
                            "hone",//ုမ်:
                            "al",//ယ်
                            "al",//ယ်လ်
                            "ae",//ယ့်
                            "hal",//ာယ်
                            "o",//ိုယ်
                            "oe",//ိုယ့်
                            "al",//ရ်
                            "an",//ာရ်
                            "hay",//ေရ်
                            "ho",//ိုရ်
                            "al",//လ်
                            "ain",//ိလ်
                            "ho",//ုလ်)
                            "all",//ောလ်
                            "all",//ော်လ်
                            "ho",//ိုလ်
                            "at",//သ်
                            "ate",//ိသ်
                            "ote",//ုသ်
                            "aye",//ေသ်
                            "ai",//ိဟ်
                            "ya",//ျ
                            "yar",//ျာ
                            "ya",//ျာ့
                            "yar",//ျာ:
                            "yi",//ျိ
                            "ye",//ျီ
                            "yee",//ျီ:
                            "yu",//ျု
                            "yuu" //ျူ
                            "yuu",//ျူ:
                            "yay",//ေျ
                            "yay",//ေျ:
                            "yal",//ျဲ
                            "yae",//ျဲ့
                            "yaw",//ေျာ
                            "yut",//ေျာ့
                            "yaw",//ေျာ်
                            "yan",//ျံ
                            "yant",//ျံ့
                            "yo",//ျို
                            "yoe",//ျို့
                            "yoe",//ျို:
                            "hone",//ျုံ
                            "hote",//ျုံ့
                            "yone",//ျုံ:
                            "yat",//ျက်
                            "yout",//ေျာက်
                            "yite",//ျိုက်
                            "at",//ျဂ်
                            "yin",//ျင်
                            "yint",//ျင့်
                            "yin",//ျင်:
                            "aung",//ေျာင်
                            "yaung",//ေျာင်:
                            "hai",//ျိုင်
                            "yite",//ျိုင့်
                            "yine",//ျိုင်:
                            "yit",//ျစ်
                            "yin",//ျဉ်
                            "yin",//ျဉ်:
                            "in",//ျာဉ်
                            "yi",//ျဉ်
                            "yeet" //ျဉ့်
                            "yee",//ျဉ်:
                            "yat",//ျတ်
                            "yate",//ျိတ်
                            "yote",//ျုတ်
                            "yan",//ျန်
                            "ant",//ျန့်
                            "yan",//ျန်:
                            "yane",//ျိန်
                            "yane",//ျိန်:
                            "yone",//ျုန်
                            "yone",//ျုန်:
                            "yat",//ျပ်
                            "yate",//ျိပ်
                            "yote",//ျုပ်
                            "yote",//ျူပ်
johabSecondTable = new Array(
  "sh",//ရှ
  "sh",//သျှ
  "sh",//လျှ
  "shw",//ရွှ
  "ar",//ာ
  "a",//ာ့
  "arr",//ာ:
  "i",//ိ
  "e",//ီ
  "eet",//ီ့
  "ee",//ီ:
  "u",//ု
  "uu",//ူ
  "hu",//ူ့
  "uu",//ူ:
  "ay",//ေ
  "ae",//ေ့
  "ay",//ေ:
  "al",//ဲ
  "ae",//ဲ့
  "aww",//ော
  "aw",//ော်
  "ot",//ော့်
  "an",//ံ
  "ant",//ံ့
  "o",//ို
  "hoet",//ို့
  "oe" //ို:
                             "yan",//ျမ်:
                             "aint",//ျိမ့်
                             "yal",//ျယ်
                             "ya",//ြ
                             "yar",//ြာ
                             "yar",//ြာ:
                             "yi",//ြိ
                             "ye",//ြီ
                             "yee",//ြီ:
                             "yu",//ြု
                             "yu",//ြူ
                             "yuu",//ြူ:
                             "yay",//ေြ
                             "hae",//ေြ့
                             "way",//ေြ:
                             "yal",//ြဲ
                             "hae",//ြဲ့
                             "yaw",//ေြာ
                             "ywae" //ေြာ့
                             "yaw",//ေြာ်
                             "yan",//ြံ
                             "yant",//ြံ့
                             "yo",//ြို
                             "yoe",//ြို့
                             "yoe",//ြို:
                             "yone",//ြုံ
                             "yote",//ြုံ့
                             "yone",//ြု:
                             "yat",//ြက်
                             "yout",//ေြာက်
                             "yite",//ြိုက်
                             "yin",//ြင်
                             "yint",//ြင့်
                             "yinn",//ြင်: )
                             "yaung",//ေြာင်
                             "yout",//ေြာင့်
                             "yaung",//ေြာင်:
                             "yai",//ြိုင်
                             "yine",//ြိုင်:
                             "yit",//ြစ်
                             "yit",//ြိစ်
                             "yin",//ြဉ်
                             "yinn",//ြဉ်:
                             "yae",//ြဉ့်
                             "yat",//ြဋ်
                             "yat",//ြတ်
                             "yate",//ြိတ်
                             "yote",//ြုတ်
                             "yan",//ြန်
                             "yant",//ြန့်
                             "yan",//ြန်:
                             "yai",//ြိန်
                             "hyate" //ြိန့်
                             "yane",//ြိန်:
                             "yone",//ြုန်:
                             "yat",//ြပ်
                             "yote",//ြုပ်
                             "yote",//ြုဗ်
                             "yan",//ြမ်
                             "yan",//ြမ်:
                             "yane",//ြိမ်
                             "yate",//ြိမ့်
                             "yane",//ြိမ်:
                             "yal",//ြယ်
                             "hlo",//ြိုလ်
                             "at",//ြသ်
                             "hate",//ြိသ်
                             "at",//ြဟ်
                             "ha",//ှ
                             "har",//ှာ
                             "ha",//ှာ့
                             "har",//ှာ:
                             "eet",//ိှ
                             "he",//ီှ
                             "hee",//ီှ:
                             "uu",//ှု
                             "hu",//ှု့
                             "huu",//ှု:
                             "huu",//ှူ
                             "huu",//ှူ:
                             "hay",//ေှ
                             "hae",//ှေ့
                             "aye",//ှေ:
                             "hal",//ဲှ
                             "hlae",//ဲှ့
                             "aww",//ှော
                             "haw" //ှော်
                             "han",//ှံ
                             "hant",//ှံ့
                             "ho",//ှို
                             "hoet",//ှို့
                             "hoe",//ှို:
                             "hone",//ှုံ
                             "hote",//ှုံ့
                             "hone",//ှုံ:
                             "hat",//ှက်
                             "hout",//ေှာက်
                             "hite",//ှိုက်
                             "hin",//ှင်
                             "hint",//ှင့် 
)
johabThirdTable = new Array(
  "",//null
  "one",//ံု
  "ote",//ံု့
  "one",//ံု:
  "hoe",//ျိုှ:
  "at",//က်
  "ate",//ိက်
  "ote",//ုက်
  "out",//ောက်
  "ite",//ိုက်
  "ite",//ိူက်
  "hote",//ုခ်
  "at",//ဂ်
  "ate",//ိဂ်
  "oat",//ုဂ်
  "in",//င်
  "int",//င့်
  "inn",//င်:
  "ain",//ိင်
  "aung",//ောင်
  "out",//ောင့်
  "aung",//ောင်:
  "ine",//ိုင်
  "hite",//ိုင့်
  "ine",//ိုင်:
  "aing",//ိူင်
  "it",//စ်
  "it" //ာစ်
                            "at",//ြာဟ်
                            "ho",//ြိုဟ်
                            "wa",//ွ
                            "war",//ွာ
                            "wa",//ွာ့
                            "warr",//ွာ:
                            "weet",//ိွ
                            "weet",//ိွ့
                            "wee",//ီွ
                            "hee",//ီွ:
                            "way",//ေွ
                            "wae",//ေွ့
                            "way",//ေွ:
                            "wal",//ဲွ
                            "wae",//ဲွ့
                            "on",//ံွ
                            "ont",//ံွ့
                            "wat",//ွက်
                            "wite" //ိုွက်
                            "win",//ွင်
                            "wint",//ွင့်
                            "win",//ွင်:
                            "oi",//ိုွင်
                            "wet",//ွစ်
                            "ut",//ွဋ်
                            "oot",//ွတ်
                            "on",//ွန်
                            "ont",//ွန့်
                            "onn",//ွန်:
                            "wot",//ွပ်
                            "wan",//ွမ်
                            "wann",//ွမ်:
                            "wal",//ွယ်
                            "wae",//ွယ့်
                            "hinn",//ှင်:
                            "hane",//ှိင်
                            "haung",//ှောင်
                            "haung",//ှောင်:
                            "laing",//ှိုင်
                            "laing",//ှိုင်:
                            "hit",//ှစ်
                            "hin",//ှဉ်
                            "hin",//ှဉ်:
                            "lae",//ှဉ့်
                            "hat",//ှတ်
                            "hote",//ှိတ်
                            "hote",//ှုတ်
                            "han",//ှန်
                            "lant",//ှန့်
                            "han",//ှန်:
                            "hane",//ှိန်
                            "hane",//ှိန်:
                            "hone" //ှုန်
                            "hote",//ှုန့်
                            "hone",//ှုန်:
                            "hat",//ှပ်
                            "hate",//ှိပ်
                            "hote",//ှုပ်
                            "hann",//ှမ်:
                            "hane",//ှိမ်
                            "ate",//ှိမ့်
                            "hal",//ှယ်
                            "shae",//ေ့ရှ်
                            "ywa",//ျွ
                            "yaunote",//ျွနု်ပ်
                            "way",//ျွေ
                            "way",//ျွေ:
                            "wal",//ျွဲ
                            )

jasoTable = new Array(
  "hars",//ာ:စ်
  "ate",//ိစ်
  "hit",//ုစ်
  "oss",//ော့စ်
  "ost",//ိုစ်
  "it",//ဇ်
  "yiz",//ာဇ်
  "ist",//ိဇ်
  "yit",//ုဇ်
  "in",//ဉ်
  "int",//ဉ့်
  "inn",//ဉ်:
  "im",//ာဉ်
  "yin",//ိဉ်
  "hone",//ုဉ်:
  "ay",//ေဉ်
  "i",//ဉ်
  "eet",//ဉ့်
  "ee",//ဉ်:
  "oot",//ဋ်
  "ate",//ိဋ်
  "ote",//ုဋ်
  "ate",//ေဋ်
  "at",//ောဋ်
  "at",//ါဌ်
  "an",//ဏ်
  "am",//ာဏ်
  "ai",//ိဏ်
  "ohn",//ုဏ်
  "hite",//ိုဏ်
  "ine",//ိုဏ်:
  "at",//တ်
  "at",//တ်စ်
  "at",//ာတ်
  "ate",//ိတ်
  "ote",//ုတ်
  "hote",//ူတ်
  "hit",//ေတ်
  "ot",//ေါ့တ်
  "at",//ဒ်
  "at",//ာဒ်
  "kit",//ိဒ်
  "oat",//ုဒ်
  "ite",//ိုဒ်
  "an",//န်
  "ant",//န့်
  "am",//န်:
  "han",//ာန်
  "ann",//ါန်:
  "ane",//ိန်
  "ate" //ိန့်
                      "wal",//ျွဲ
                      "yon",//ျွံ
                      "yot",//ျွက်
                      "ywin",//ျွင်
                      "yut",//ျွတ်
                      "hon",//ျွန်
                      "honn",//ျွန်:
                      "yun",//ျွမ်:
                      "hwa",//ျှ
                      "lyar",//ျှာ:
                      "haw",//ျှော
                      "hawe",//ျှော့
                      "haw",//ျှော်
                      "hloe",//ျှို့
                      "hlin",//ျှင်
                      "hit",//ျှစ်
                      "yinn",//ျှဉ်:
                      "wa" //ြွ
                      "war",//ြွာ
                      "wyar",//ြွာ:
                      "way",//ြွေ
                      "ywae",//ြွေ့
                      "way",//ြွေ:
                      "wyat",//ြွက်
                      "wyin",//ြွင်:
                      "yoot",//ြွတ်
                      "yoon",//ြွန်
                      "yut",//ြွပ်
                      "wyan",//ြွမ်:
                      "ywal",//ြွယ်
                      "yu",//ြှူ
                      "yae",//ြှေ:
                      "yone",//ြှုံ:
                      "yout",//ြှောက်
                      "yite",//ြှိုက်
                      "yint",//ြှင့်
                      "yaung",//ြှောင်
                      "yout",//ြှောင့်
                      "yaung",//ြှောင်:
                      "hote",//ြှပ်
                      "yote",//ြှုပ်
                      "yine",//ြှိမ်:
                      "lwa",//ွှ
                      "hwar",//ွှာ
                      "war",//ွှာ:
                      "wee",//ွှီ:
                      "lwae",//ွှေ
                      "lwae",//ွှေ့
                      "wae",//ွှေ:
                      "wal",//ွှဲ
                      "won",//ွှံ
                      "yon" //ွှံ့
                      "hwin",//ွှင်
                      "wint",//ွှင့်
                      "hwin",//ွှင်:
                      "oot",//ွှတ်
                      "yon",//ွှန်
                      "yon",//ွှန်:
                      "wat",//ွှပ်
                      "wan",//ွှမ်:
                      "yun",//ျွှန်
)
                            
function isUnicodeChar(mystr) {
  my_unicode_number = mystr.charCodeAt(0);
  if(my_unicode_number >=44032 && my_unicode_number <= (44032 + 11172 - 1))
    return true;
  return false;
}

function isJasoConsonantChar(mystr) {
  my_unicode_number = mystr.charCodeAt(0);
  if(my_unicode_number >= 12593 && my_unicode_number <= (12593 + 30 -1))
    return true;
  return false;
}

function isJasoVowelChar(mystr) {
  my_unicode_number = mystr.charCodeAt(0);
  if(my_unicode_number >= 12623 && my_unicode_number <= (12623 + 21 -1))
    return true;
  return false;
}

function isJasoChar(mystr) {
  if(isJasoConsonantChar(mystr) || isJasoVowelChar(mystr)) return true;
  return false;
}

function isConsonantKey(mystr) {
  if("rRseEfaqQtTdwWczxvg".indexOf(mystr) < 0)
    return false;
  return true;
}

function isVowelKey(mystr) {
  if("koiOjpuPhynbml".indexOf(mystr) < 0)
    return false;
  return true;
}

function isJasoKey(mystr) {
  if(isConsonantKey(mystr) || isVowelKey(mystr))
    return true;
  return false;
}

function johabFirstFromKeyToCode(mystr) {
  for(i=0;i < johabFirstTable.length; i++) {
    if(mystr == johabFirstTable[i]) return i;
  }
  return -1;
}

function johabSecondFromKeyToCode(mystr) {
  for(i=0;i < johabSecondTable.length; i++) {
    if(mystr == johabSecondTable[i]) return i
  }
  return -1
}

function johabThirdFromKeyToCode(mystr) {
  for(i=0;i < johabThirdTable.length; i++) {
    if(mystr == johabThirdTable[i]) return i
  }
  return -1
}

function jasoFromKeyToCode(mystr) {
  for(i=0; i < jasoTable.length; i++) {
    if(mystr == jasoTable[i]) return i
  }
  return -1
}

function isJohabFirstKey(mystr) {
  if(johabFirstFromKeyToCode(mystr) < 0)
    return false
  return true
}

function isJohabSecondKey(mystr) {
  if(johabSecondFromKeyToCode(mystr) < 0)
    return false
  return true
}

function isJohabThirdKey(mystr) {
  if(johabThirdFromKeyToCode(mystr) < 0)
    return false
  return true
}

function isJohabJasoKey(mystr) {
  if(jasoFromKeyToCode(mystr) < 0)
    return false
  return true
}

function jasoFromCodeToChar(my_no) {
  my_no = my_no + 12593
  return String.fromCharCode(my_no)
}

function jasoFromKeyToChar(my_key){
  return jasoFromCodeToChar(jasoFromKeyToCode(my_key))
}

function johabFromThreeCodeToChar(myfirst_no, mysecond_no, mythird_no) {
  my_no = (myfirst_no * 21 + mysecond_no) * 28 + mythird_no + 44032
  return String.fromCharCode(my_no)
}

function ClassJohabFromChar(mystr) {
  if(isUnicodeChar(mystr)) {
    my_unicode_number = mystr.charCodeAt(0);
    dec = my_unicode_number - 44032;
    tmp = 0;
    this.third = dec % 28;
    tmp = (dec - this.third) / 28;
    this.second = tmp % 21;
    this.first = (tmp - this.second) / 21;
  }
  this.toChar = method_fromJohabObjToChar
  this.getFirstKey = method_fromJohabObjToFirstKey
  this.getSecondKey = method_fromJohabObjToSecondKey
  this.getThirdKey = method_fromJohabObjToThirdKey
  this.getFirstCode = method_fromJohabObjToFirstCode
  this.getSecondCode = method_fromJohabObjToSecondCode
  this.getThirdCode = method_fromJohabObjToThirdCode
  this.setFirstKey = method_johabSetFirstKey
  this.setSecondKey = method_johabSetSecondKey
  this.setThirdKey = method_johabSetThirdKey
  this.setFirstCode = method_johabSetFirstCode
  this.setSecondCode = method_johabSetSecondCode
  this.setThirdCode = method_johabSetThirdCode
  this.deleteOneJaso = method_johabDeleteOneJaso
}

function ClassJohabFromKey(myfirst, mysecond, mythird) {
  if(johabFirstCode(myfirst) >=0) {
    this.first = johabFirstFromKeyCode(myfirst)
  }
  if(johabSecondCode(mysecond) >=0) {
    this.second = johabSecondFromKeyToCode(mysecond)
  }
  if(johabThirdCode(mythird) >=0) {
    this.third = johabThirdFromKeyToCode(mythird)
  }
  this.toChar = method_fromJohabObjToChar
  this.getFirstKey = method_fromJohabObjToFirstKey
  this.getSecondKey = method_fromJohabObjToSecondKey
  this.getThirdKey = method_fromJohabObjToThirdKey
  this.getFirstCode = method_fromJohabObjToFirstCode
  this.getSecondCode = method_fromJohabObjToSecondCode
  this.getThirdCode = method_fromJohabObjToThirdCode
  this.setFirstKey = method_johabSetFirstKey
  this.setSecondKey = method_johabSetSecondKey
  this.setThirdKey = method_johabSetThirdKey
  this.setFirstCode = method_johabSetFirstCode
  this.setSecondCode = method_johabSetSecondCode
  this.setThirdCode = method_johabSetThirdCode
  this.deleteOneJaso = method_johabDeleteOneJaso
}

function method_fromJohabObjToChar() {
  return johabFromThreeCodeToChar(this.first, this.second, this.third)
}

function method_johabDeleteOneJaso() {
  if(this.getThirdCode() != 0) {
    this.setThirdKey(this.getThirdKey().substring(0,
                                             this.getThirdKey().length - 1));
    return this.toChar();
  } else if(this.getSecondKey().length > 1) {
    this.setSecondKey(this.getSecondKey().substring(0,1));
    return this.toChar();
  } else {
    return jasoFromKeyToChar(this.getFirstKey());
  } 
}

function ClassJohabFromJasoChar(mystr) {
  if(isJasoChar(mystr)) {
    my_unicode_number = mystr.charCodeAt(0);
    this.jaso = my_unicode_number - 12593;

    this.toChar = method_fromJohabObjToJasoChar
    this.getJasoKey = method_johabGetJasoKey
    this.getJasoCode = method_johabGetJasoCode
    this.setJasoKey = method_johabSetJasoKey
    this.setJasoCode = method_johabSetJasoCode
    this.deleteOneJaso = method_jasoDeleteOneJaso
  }
}

function method_fromJohabObjToJasoChar() {
  return jasoFromCodeToChar(this.jaso)
}

function method_fromJohabObjToFirstKey() {
  return johabFirstTable[this.first]
}

function method_fromJohabObjToSecondKey() {
  return johabSecondTable[this.second]
}

function method_fromJohabObjToThirdKey() {
  return johabThirdTable[this.third]
}

function method_johabGetJasoKey() {
  return jasoTable[this.jaso]
}

function method_fromJohabObjToFirstCode(){
  return this.first
}

function method_fromJohabObjToSecondCode(){
  return this.second
}

function method_fromJohabObjToThirdCode(){
  return this.third
}

function method_johabGetJasoCode() {
  return this.jaso
}

function method_johabSetFirstKey(mykey){
  this.first = johabFirstFromKeyToCode(mykey)
}

function method_johabSetSecondKey(mykey){
  this.second = johabSecondFromKeyToCode(mykey)
}

function method_johabSetThirdKey(mykey){
  this.third = johabThirdFromKeyToCode(mykey)
}

function method_johabSetJasoKey(mykey) {
  this.jaso = jasoFromKeyToCode(mykey)
}

function method_johabSetFirstCode(mycode){
  this.first = mycode
}

function method_johabSetSecondCode(mycode){
  this.second = mycode
}

function method_johabSetThirdCode(mycode){
  this.third = mycode
}

function method_johabSetJasoCode(mycode) {
  this.jaso = mycode
}

function method_jasoDeleteOneJaso() {
  if(this.getJasoKey().length > 1) {
    this.setJasoKey(this.getJasoKey().substring(0,1));
    return this.toChar();
  } else return "";
}

function unicodePlusJasoKey(mystr, jaso_key) {
  var last_johab = new ClassJohabFromChar(mystr);
  if(isConsonantKey(jaso_key)) {
    if(isJohabThirdKey(last_johab.getThirdKey() + jaso_key)) {
      last_johab.setThirdKey(last_johab.getThirdKey() + jaso_key)
      return last_johab.toChar()
    } else {
      return (mystr + jasoFromKeyToChar(jaso_key))
    }
  }
  if(isVowelKey(jaso_key)) {
    if(last_johab.getThirdKey().length == 2) {
      new_firstCode = johabFirstFromKeyToCode(last_johab.getThirdKey().charAt(1))
      new_secondCode = johabSecondFromKeyToCode(jaso_key)
      last_johab.setThirdKey(last_johab.getThirdKey().charAt(0))
      return (last_johab.toChar()
              + johabFromThreeCodeToChar(new_firstCode,new_secondCode, 0))
    } else if (last_johab.getThirdKey().length == 1) {
      new_firstCode = johabFirstFromKeyToCode(last_johab.getThirdKey())
      new_secondCode = johabSecondFromKeyToCode(jaso_key)
      last_johab.setThirdKey("")
      return (last_johab.toChar()
              + johabFromThreeCodeToChar(new_firstCode,new_secondCode, 0))
    } else if(isJohabSecondKey(last_johab.getSecondKey() + jaso_key)) {
      last_johab.setSecondKey(last_johab.getSecondKey() + jaso_key)
      return last_johab.toChar()
    } else {
      return (last_johab.toChar() + jasoFromKeyToChar(jaso_key))
    }
  }
}

// ㅏ + ㅣ ==> ㅐ の合成をするための関数
// ベースが2ボル式キーなので、この合成には特別な処理が必要
function unicodePlusJasoKey_ai(mystr, jaso_key) {
  var last_johab = new ClassJohabFromChar(mystr);
  var key_sequence = last_johab.getFirstKey() + last_johab.getSecondKey()
                     + last_johab.getThirdKey() + jaso_key;
  var last_2_keys = key_sequence.substring(key_sequence.length - 2,key_sequence.length);
  if(last_2_keys == "kl") { // ㅏ + ㅣ の形
    var last_second_keys = last_johab.getSecondKey();
    last_johab.setSecondKey(last_second_keys.substring(0,last_second_keys.length -1) + "o"); // ㅐ
    return last_johab.toChar();
  } else if(last_2_keys == "jl") { // ㅓ + ㅣ の形
    var last_second_keys = last_johab.getSecondKey();
    last_johab.setSecondKey(last_second_keys.substring(0,last_second_keys.length -1) + "p"); // ㅔ
    return last_johab.toChar();
  } else if(last_2_keys == "il") { // ㅑ + ㅣ の形
    var last_second_keys = last_johab.getSecondKey();
    last_johab.setSecondKey(last_second_keys.substring(0,last_second_keys.length -1) + "O"); // ㅒ
    return last_johab.toChar();
  } else if(last_2_keys == "ul") { // ㅕ + ㅣ の形
    var last_second_keys = last_johab.getSecondKey();
    last_johab.setSecondKey(last_second_keys.substring(0,last_second_keys.length -1) + "P"); // ㅖ
    return last_johab.toChar();
  } else {
    return unicodePlusJasoKey(mystr, jaso_key);
  }
}

function jasoPlusJasoKey(jasoChar, jasoKey){
  last_jaso = new ClassJohabFromJasoChar(jasoChar);
  if(isVowelKey(jasoKey) && isJasoConsonantChar(jasoChar)){
    return johabFromThreeCodeToChar(
              johabFirstFromKeyToCode(last_jaso.getJasoKey()),
              johabSecondFromKeyToCode(jasoKey), 0)
  } else return (jasoChar + jasoFromKeyToChar(jasoKey))
}

function strPlusJasoKey(mystr, jasoKey){
  if(mystr.length <= 0) return jasoFromKeyToChar(jasoKey);
  lastChar = mystr.substring(mystr.length - 1, mystr.length);
  mystr = mystr.substring(0, mystr.length - 1);
  if(isUnicodeChar(lastChar)) {
    return (mystr + unicodePlusJasoKey(lastChar, jasoKey));
  } else if(isJasoChar(lastChar)) {
    return (mystr + jasoPlusJasoKey(lastChar, jasoKey));
  } else return (mystr + lastChar + jasoFromKeyToChar(jasoKey));
}

//  +  ==>  の合成をするための関数
// ベースが2ボル式キーなので、この合成には特別な処理が必要
function strPlusJasoKey_ai(mystr, jasoKey){
  if(mystr.length <= 0) return jasoFromKeyToChar(jasoKey);
  lastChar = mystr.substring(mystr.length - 1, mystr.length);
  mystr = mystr.substring(0, mystr.length - 1);
  if(isUnicodeChar(lastChar)) {
    return (mystr + unicodePlusJasoKey_ai(lastChar, jasoKey));
  } else if(isJasoChar(lastChar)) {
    return (mystr + jasoPlusJasoKey(lastChar, jasoKey));
  } else return (mystr + lastChar + jasoFromKeyToChar(jasoKey));
}

function strPlusJasoKeyString(mystr, jasoKeyString){
  for(k = 0; k < jasoKeyString.length; k++) {
    mystr = strPlusJasoKey(mystr, jasoKeyString.charAt(k));
  }
  return mystr;
}

function strDeleteOneJaso(mystr){
  if(mystr.length <= 0) return "";
  lastChar = mystr.substring(mystr.length - 1, mystr.length);
  mystr = mystr.substring(0, mystr.length - 1);
  if(isUnicodeChar(lastChar)) {
    lastCharObj = new ClassJohabFromChar(lastChar);
    lastChar = lastCharObj.deleteOneJaso();
    if(isJasoChar(lastChar)) {
      lastCharObj = new ClassJohabFromJasoChar(lastChar);
      return strPlusJasoKey(mystr, lastCharObj.getJasoKey());
    } else return (mystr + lastChar);
  } else return mystr;
}

//この関数を追加
function toMyanmarKeyAll(mystr) {
  var j=0;
  var return_str = "";
  for (j=0; j<mystr.length; j++) {
    if(isUnicodeChar(mystr.charAt(j))) {
      var unicodechar = new ClassJohabFromChar(mystr.charAt(j));
      return_str += unicodechar.getFirstKey();
      return_str += unicodechar.getSecondKey();
      return_str += unicodechar.getThirdKey();
    } else if(isJasoConsonantChar(mystr.charAt(j))) {
      var jasochar = new ClassJohabFromJasoChar(mystr.charAt(j));
      return_str += jasochar.getJasoKey();
    } else {
      return_str += mystr.charAt(j);
    }
  }
  return return_str;
}
