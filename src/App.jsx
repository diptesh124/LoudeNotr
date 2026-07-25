import React, { useState, useRef, useEffect } from "react";
import { Megaphone, Image as ImageIcon, Mic, Video as VideoIcon, PenTool, X, Trash2, Globe, Square, Type } from "lucide-react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "as", label: "অসমীয়া" },
  { code: "ur", label: "اردو" },
];

const CAT_KEYS = ["catPolice", "catCorruption", "catHumanRights", "catEnvironment", "catPublicServices", "catOther"];
const CAT_EMOJI = { catPolice: "🚓", catCorruption: "💰", catHumanRights: "✊", catEnvironment: "🌱", catPublicServices: "🏛️", catOther: "✨" };

const T = {
  en: { 
    appName: "LoudNote", tagline: "Say it once. Let everyone hear it.", publicTitle: "Before you post", publicBody: "Everything here is public — anyone, including the government, can see it. Don't include your name or face if you want to stay anonymous.", composeCta: "Add your voice", typeText: "Text", typePhoto: "Photo", typeVoice: "Voice note", typeVideo: "Video link", typeDrawing: "Sketch", titleLabel: "Title", titlePh: "What's this about?", categoryLabel: "Category", textLabel: "Your message", textPh: "Say what happened", videoLinkLabel: "Paste a video link", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "Record", stopBtn: "Stop", retakeBtn: "Re-record", chooseFileBtn: "Choose photo", clearDrawing: "Clear", postBtn: "Post publicly", feedHeading: "Public feed", emptyFeed: "Nothing posted yet. Be the first to speak up.", deleteBtn: "Remove", allFilter: "All", loading: "Loading…", postedMsg: "Posted.", postFail: "Couldn't post — try again.", addSomething: "Add a title and some content first.", recording: "Recording…", tooLong: "That's a bit long — keep voice notes short.", tooBig: "That file's too big — try a smaller photo.",
    catPolice: "Police Brutality", catCorruption: "Corruption", catHumanRights: "Human Rights", catEnvironment: "Environment", catPublicServices: "Public Services", catOther: "Other"
  },
  hi: { 
    appName: "LoudNote", tagline: "एक बार बोलो। सबको सुनने दो।", publicTitle: "पोस्ट करने से पहले", publicBody: "यहाँ सब कुछ सार्वजनिक है — सरकार समेत कोई भी इसे देख सकता है। गुमनाम रहना है तो नाम या चेहरा न डालें।", composeCta: "अपनी बात रखें", typeText: "टेक्स्ट", typePhoto: "फ़ोटो", typeVoice: "वॉइस नोट", typeVideo: "वीडियो लिंक", typeDrawing: "स्केच", titleLabel: "शीर्षक", titlePh: "यह किस बारे में है?", categoryLabel: "श्रेणी", textLabel: "आपका संदेश", textPh: "क्या हुआ बताएं", videoLinkLabel: "वीडियो लिंक पेस्ट करें", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "रिकॉर्ड करें", stopBtn: "रोकें", retakeBtn: "फिर रिकॉर्ड करें", chooseFileBtn: "फ़ोटो चुनें", clearDrawing: "साफ़ करें", postBtn: "सार्वजनिक पोस्ट करें", feedHeading: "पब्लिक फ़ीड", emptyFeed: "अभी कुछ पोस्ट नहीं हुआ। सबसे पहले आप बोलें।", deleteBtn: "हटाएं", allFilter: "सभी", loading: "लोड हो रहा है…", postedMsg: "पोस्ट हो गया।", postFail: "पोस्ट नहीं हुआ — फिर कोशिश करें।", addSomething: "पहले शीर्षक और कुछ सामग्री जोड़ें।", recording: "रिकॉर्डिंग हो रही है…", tooLong: "यह थोड़ा लंबा है — वॉइस नोट छोटा रखें।", tooBig: "फ़ाइल बहुत बड़ी है — छोटी फ़ोटो चुनें।",
    catPolice: "पुलिस बर्बरता", catCorruption: "भ्रष्टाचार", catHumanRights: "मानवाधिकार", catEnvironment: "पर्यावरण", catPublicServices: "सार्वजनिक सेवाएं", catOther: "अन्य"
  },
  bn: {
    appName: "LoudNote", tagline: "একবার বলুন। সবাইকে শুনতে দিন।", publicTitle: "পোস্ট করার আগে", publicBody: "এখানে সবকিছু প্রকাশ্য — সরকার সহ যে কেউ এটি দেখতে পারে। আপনি যদি নাম প্রকাশ না করতে চান তবে আপনার নাম বা মুখ অন্তর্ভুক্ত করবেন না।", composeCta: "আপনার মতামত যোগ করুন", typeText: "টেক্সট", typePhoto: "ছবি", typeVoice: "ভয়েস নোট", typeVideo: "ভিডিও লিঙ্ক", typeDrawing: "স্কেচ", titleLabel: "শিরোনাম", titlePh: "এটি কী সম্পর্কে?", categoryLabel: "বিভাগ", textLabel: "আপনার বার্তা", textPh: "কী ঘটেছে বলুন", videoLinkLabel: "ভিডিও লিঙ্ক পেস্ট করুন", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "রেকর্ড করুন", stopBtn: "থামুন", retakeBtn: "পুনরায় রেকর্ড করুন", chooseFileBtn: "ছবি বাছুন", clearDrawing: "মুছে ফেলুন", postBtn: "প্রকাশ্যে পোস্ট করুন", feedHeading: "পাবলিক ফিড", emptyFeed: "এখনও কিছু পোস্ট করা হয়নি। প্রথম বার্তাটি আপনিই দিন।", deleteBtn: "মুছে ফেলুন", allFilter: "সব", loading: "লোড হচ্ছে…", postedMsg: "পোস্ট করা হয়েছে।", postFail: "পোস্ট করা যায়নি — আবার চেষ্টা করুন।", addSomething: "প্রথমে একটি শিরোনাম এবং কিছু বিষয়বস্তু যোগ করুন।", recording: "রেকর্ডিং হচ্ছে…", tooLong: "এটি কিছুটা দীর্ঘ — ভয়েস নোট ছোট রাখুন।", tooBig: "ফাইলটি খুব বড় — একটি ছোট ছবি চেষ্টা করুন।",
    catPolice: "পুলিশি বর্বরতা", catCorruption: "দুর্নীতি", catHumanRights: "মানবাধিকার", catEnvironment: "পরিবেশ", catPublicServices: "জনপরিষেবা", catOther: "অন্যান্য"
  },
  te: {
    appName: "LoudNote", tagline: "ఒక్కసారి చెప్పండి. అందరికీ వినపడనీయండి.", publicTitle: "పోస్ట్ చేసే ముందు", publicBody: "ఇక్కడ అంతా బహిరంగం — ప్రభుత్వంతో సహా ఎవరైనా చూడవచ్చు. మీరు అనామకంగా ఉండాలనుకుంటే మీ పేరు లేదా ముఖాన్ని చేర్చవద్దు.", composeCta: "మీ స్వరాన్ని జోడించండి", typeText: "టెక్స్ట్", typePhoto: "ఫోటో", typeVoice: "వాయిస్ నోట్", typeVideo: "వీడియో లింక్", typeDrawing: "స్కెచ్", titleLabel: "శీర్షిక", titlePh: "ఇది దేని గురించి?", categoryLabel: "కేటగిరీ", textLabel: "మీ సందేశం", textPh: "ఏం జరిగిందో చెప్పండి", videoLinkLabel: "వీడియో లింక్‌ను పేస్ట్ చేయండి", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "రికార్డ్ చేయండి", stopBtn: "ఆపండి", retakeBtn: "మళ్లీ రికార్డ్ చేయండి", chooseFileBtn: "ఫోటోను ఎంచుకోండి", clearDrawing: "క్లియర్ చేయండి", postBtn: "పబ్లిక్‌గా పోస్ట్ చేయండి", feedHeading: "పబ్లిక్ ఫీడ్", emptyFeed: "ఇంకా ఏమీ పోస్ట్ చేయలేదు. మొదట మీరే మాట్లాడండి.", deleteBtn: "తొలగించండి", allFilter: "అన్నీ", loading: "లోడ్ అవుతోంది…", postedMsg: "పోస్ట్ చేయబడింది.", postFail: "పోస్ట్ చేయడం కుదరలేదు — మళ్లీ ప్రయత్నించండి.", addSomething: "ముందుగా శీర్షిక మరియు కొంత కంటెంట్‌ను జోడించండి.", recording: "రికార్డింగ్ అవుతోంది…", tooLong: "ఇది కాస్త పెద్దదిగా ఉంది — వాయిస్ నోట్‌లను చిన్నగా ఉంచండి.", tooBig: "ఆ ఫైల్ చాలా పెద్దది — చిన్న ఫోటోను ప్రయత్నించండి.",
    catPolice: "పోలీసు క్రూరత్వం", catCorruption: "అవినీతి", catHumanRights: "మానవ హక్కులు", catEnvironment: "పర్యావరణం", catPublicServices: "ప్రజా సేవలు", catOther: "ఇతర"
  },
  mr: {
    appName: "LoudNote", tagline: "एकदाच सांगा. सर्वांना ऐकू जाऊ द्या.", publicTitle: "पोस्ट करण्यापूर्वी", publicBody: "येथे सर्व काही सार्वजनिक आहे — सरकारसह कोणीही ते पाहू शकते. तुम्हाला निनावी राहायचे असल्यास तुमचे नाव किंवा चेहरा समाविष्ट करू नका.", composeCta: "तुमचा आवाज जोडा", typeText: "मजकूर", typePhoto: "फोटो", typeVoice: "व्हॉइस टीप", typeVideo: "व्हिडिओ लिंक", typeDrawing: "रेखाचित्र", titleLabel: "शीर्षक", titlePh: "हे कशाबद्दल आहे?", categoryLabel: "वर्ग", textLabel: "तुमचा संदेश", textPh: "काय घडले ते सांगा", videoLinkLabel: "व्हिडिओ लिंक पेस्ट करा", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "रेकॉर्ड करा", stopBtn: "थांबवा", retakeBtn: "पुन्हा रेकॉर्ड करा", chooseFileBtn: "फोटो निवडा", clearDrawing: "साफ करा", postBtn: "सार्वजनिकरीत्या पोस्ट करा", feedHeading: "सार्वजनिक फीड", emptyFeed: "अद्याप काहीही पोस्ट केलेले नाही. प्रथम तुम्ही बोला.", deleteBtn: "काढून टाका", allFilter: "सर्व", loading: "लोड होत आहे…", postedMsg: "पोस्ट झाले.", postFail: "पोस्ट करता आले नाही — पुन्हा प्रयत्न करा.", addSomething: "प्रथम शीर्षक आणि काही मजकूर जोडा.", recording: "रेकॉर्डिंग सुरू आहे…", tooLong: "हे थोडे लांब आहे — व्हॉइस टीप लहान ठेवा.", tooBig: "ती फाइल खूप मोठी आहे — लहान फोटो निवडा.",
    catPolice: "पोलीस अत्याचार", catCorruption: "भ्रष्टाचार", catHumanRights: "मानवाधिकार", catEnvironment: "पर्यावरण", catPublicServices: "सार्वजनिक सेवा", catOther: "इतर"
  },
  ta: {
    appName: "LoudNote", tagline: "ஒருமுறை சொல்லுங்கள். அனைவரும் கேட்கட்டும்.", publicTitle: "பதிவு செய்வதற்கு முன்", publicBody: "இங்குள்ள அனைத்தும் பொதுவானவை — அரசு உட்பட யார் வேண்டுமானாலும் பார்க்கலாம். அநாமதேயமாக இருக்க விரும்பினால் உங்கள் பெயர் அல்லது முகத்தைச் சேர்க்க வேண்டாம்.", composeCta: "உங்கள் குரலைச் சேர்க்கவும்", typeText: "உரை", typePhoto: "புகைப்படம்", typeVoice: "குரல் குறிப்பு", typeVideo: "வீடியோ லிங்க்", typeDrawing: "வரைபடம்", titleLabel: "தலைப்பு", titlePh: "இது எதைப் பற்றியது?", categoryLabel: "வகை", textLabel: "உங்கள் செய்தி", textPh: "என்ன நடந்தது என்று சொல்லுங்கள்", videoLinkLabel: "வீடியோ லிங்கை ஒட்டவும்", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "பதிவுசெய்", stopBtn: "நிறுத்து", retakeBtn: "மீண்டும் பதிவுசெய்", chooseFileBtn: "புகைப்படத்தைத் தேர்ந்தெடுக்கவும்", clearDrawing: "அழி", postBtn: "பொதுவாகப் பதிவுசெய்", feedHeading: "பொது ஃபீட்", emptyFeed: "இன்னும் எதுவும் பதிவிடப்படவில்லை. முதன்முதலில் பேசுங்கள்.", deleteBtn: "நீக்கு", allFilter: "அனைத்தும்", loading: "ஏற்றப்படுகிறது…", postedMsg: "பதிவிடப்பட்டது.", postFail: "பதிவிட முடியவில்லை — மீண்டும் முயற்சிக்கவும்.", addSomething: "முதலில் ஒரு தலைப்பையும் உரையும் சேர்க்கவும்.", recording: "பதிவாகிறது…", tooLong: "இது சற்றே நீளமாக உள்ளது — குரல் குறிப்புகளைச் சுருக்கமாக வைக்கவும்.", tooBig: "அந்தக் கோப்பு மிகவும் பெரியது — சிறிய புகைப்படத்தைப் பயன்படுத்தவும்.",
    catPolice: "காவல்துறை அத்துமீறல்", catCorruption: "ஊழல்", catHumanRights: "மனித உரிமைகள்", catEnvironment: "சுற்றுச்சூழல்", catPublicServices: "பொதுச் சேவைகள்", catOther: "மற்றவை"
  },
  gu: {
    appName: "LoudNote", tagline: "એકવાર કહો. દરેકને સાંભળવા દો.", publicTitle: "પોસ્ટ કરતા પહેલા", publicBody: "અહીં બધું જાહેરમાં છે — સરકાર સહિત કોઈ પણ જોઈ શકે છે. જો તમે અનામી રહેવા માંગતા હોવ તો તમારું નામ કે ચહેરો ઉમેરશો નહીં.", composeCta: "તમારો અવાજ ઉમેરો", typeText: "ટેક્સ્ટ", typePhoto: "ફોટો", typeVoice: "વોઇસ નોટ", typeVideo: "વિડિઓ લિંક", typeDrawing: "સ્કેચ", titleLabel: "શીર્ષક", titlePh: "આ શાના વિશે છે?", categoryLabel: "કેટેગરી", textLabel: "તમારો સંદેશ", textPh: "શું થયું તે કહો", videoLinkLabel: "વિડિઓ લિંક પેસ્ટ કરો", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "રેકોર્ડ કરો", stopBtn: "રોકો", retakeBtn: "ફરી રેકોર્ડ કરો", chooseFileBtn: "ફોટો પસંદ કરો", clearDrawing: "સાફ કરો", postBtn: "જાહેરમાં પોસ્ટ કરો", feedHeading: "પબ્લિક ફીડ", emptyFeed: "હજી સુધી કંઈ પોસ્ટ થયું નથી. પ્રથમ તમે બોલો.", deleteBtn: "હટાવો", allFilter: "બધા", loading: "લોડ થઈ રહ્યું છે…", postedMsg: "પોસ્ટ થઈ ગયું.", postFail: "પોસ્ટ થઈ શક્યું નથી — ફરી પ્રયાસ કરો.", addSomething: "પ્રથમ શીર્ષક અને સામગ્રી ઉમેરો.", recording: "રેકોર્ડિંગ થઈ રહ્યું છે…", tooLong: "આ થોડું લાંબુ છે — વોઇસ નોટ ટૂંકી રાખો.", tooBig: "તે ફાઇલ બહુ મોટી છે — નાનો ફોટો પસંદ કરો.",
    catPolice: "પોલીસ અત્યાચાર", catCorruption: "ભ્રષ્ટાચાર", catHumanRights: "માનવ અધિકાર", catEnvironment: "પર્યાવરણ", catPublicServices: "જાહેર સેવાઓ", catOther: "અન્ય"
  },
  kn: {
    appName: "LoudNote", tagline: "ಒಮ್ಮೆ ಹೇಳಿ. ಎಲ್ಲರೂ ಕೇಳಲಿ.", publicTitle: "ಪೋಸ್ಟ್ ಮಾಡುವ ಮೊದಲು", publicBody: "ಇಲ್ಲಿ ಪ್ರತಿಯೊಂದೂ ಸಾರ್ವಜನಿಕವಾಗಿದೆ — ಸರ್ಕಾರವೂ ಸೇರಿದಂತೆ ಯಾರಾದರೂ ಇದನ್ನು ನೋಡಬಹುದು. ನೀವು ಅನಾಮಧೇಯರಾಗಿರಲು ಬಯಸಿದರೆ ನಿಮ್ಮ ಹೆಸರು ಅಥವಾ ಮುಖವನ್ನು ಸೇರಿಸಬೇಡಿ.", composeCta: "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಸೇರಿಸಿ", typeText: "ಪಠ್ಯ", typePhoto: "ಫೋಟೋ", typeVoice: "ವಾಯ್ಸ್ ನೋಟ್", typeVideo: "ವೀಡಿಯೊ ಲಿಂಕ್", typeDrawing: "ಸ್ಕೆಚ್", titleLabel: "ಶೀರ್ಷಿಕೆ", titlePh: "ಇದು ಯಾವುದರ ಬಗ್ಗೆ?", categoryLabel: "ವರ್ಗ", textLabel: "ನಿಮ್ಮ ಸಂದೇಶ", textPh: "ಏನಾಯಿತು ಎಂದು ಹೇಳಿ", videoLinkLabel: "ವೀಡಿಯೊ ಲಿಂಕ್ ಪೇಸ್ಟ್ ಮಾಡಿ", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "ರೆಕಾರ್ಡ್ ಮಾಡಿ", stopBtn: "ನಿಲ್ಲಿಸಿ", retakeBtn: "ಮತ್ತೆ ರೆಕಾರ್ಡ್ ಮಾಡಿ", chooseFileBtn: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ", clearDrawing: "ಕ್ಲಿಯರ್ ಮಾಡಿ", postBtn: "ಸಾರ್ವಜನಿಕವಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಿ", feedHeading: "ಸಾರ್ವಜನಿಕ ಫೀಡ್", emptyFeed: "ಇನ್ನೂ ಏನನ್ನೂ ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿಲ್ಲ. ಮೊದಲು ನೀವೇ ಮಾತನಾಡಿ.", deleteBtn: "ತೆಗೆದುಹಾಕಿ", allFilter: "ಎಲ್ಲವೂ", loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ…", postedMsg: "ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ.", postFail: "ಪೋಸ್ಟ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ — ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", addSomething: "ಮೊದಲು ಶೀರ್ಷಿಕೆ ಮತ್ತು ವಿವರವನ್ನು ಸೇರಿಸಿ.", recording: "ರೆಕಾರ್ಡ್ ಆಗುತ್ತಿದೆ…", tooLong: "ಇದು ಸ್ವಲ್ಪ ಉದ್ದವಾಗಿದೆ — ವಾಯ್ಸ್ ನೋಟ್‌ಗಳನ್ನು ಚಿಕ್ಕದಾಗಿರಿಸಿ.", tooBig: "ಆ ಫೈಲ್ ತುಂಬಾ ದೊಡ್ಡದಾಗಿದೆ — ಸಣ್ಣ ಫೋಟೋ ಪ್ರಯತ್ನಿಸಿ.",
    catPolice: "ಪೋಲೀಸ್ ದೌರ್ಜನ್ಯ", catCorruption: "ಭ್ರಷ್ಟಾಚಾರ", catHumanRights: "ಮಾನವ ಹಕ್ಕುಗಳು", catEnvironment: "ಪರಿಸರ", catPublicServices: "ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು", catOther: "ಇತರ"
  },
  ml: {
    appName: "LoudNote", tagline: "ഒരിക്കൽ പറയൂ. എല്ലാവരും കേൾക്കട്ടെ.", publicTitle: "പോസ്റ്റ് ചെയ്യുന്നതിന് മുൻപ്", publicBody: "ഇവിടെയുള്ളതെല്ലാം പരസ്യമാണ് — സർക്കാരടക്കം ആർക്കും ഇത് കാണാം. അജ്ഞാതനായിരിക്കാൻ ആഗ്രഹിക്കുന്നുവെങ്കിൽ നിങ്ങളുടെ പേരോ മുഖമോ ഉൾപ്പെടുത്തരുത്.", composeCta: "നിങ്ങളുടെ ശബ്ദം പങ്കുവെക്കൂ", typeText: "ടെക്സ്റ്റ്", typePhoto: "ഫോട്ടോ", typeVoice: "വോയ്സ് നോട്ട്", typeVideo: "വീഡിയോ ലിങ്ക്", typeDrawing: "സ്കെച്ച്", titleLabel: "തലക്കെട്ട്", titlePh: "ഇത് എന്തിനെക്കുറിച്ചാണ്?", categoryLabel: "വിഭാഗം", textLabel: "നിങ്ങളുടെ സന്ദേശം", textPh: "എന്താണ് സംഭവിച്ചതെന്ന് പറയൂ", videoLinkLabel: "വീഡിയോ ലിങ്ക് പേസ്റ്റ് ചെയ്യുക", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "റെക്കോർഡ് ചെയ്യുക", stopBtn: "നിർത്തുക", retakeBtn: "വീണ്ടും റെക്കോർഡ് ചെയ്യുക", chooseFileBtn: "ഫോട്ടോ തിരഞ്ഞെടുക്കുക", clearDrawing: "വ്യക്തമാക്കുക", postBtn: "പബ്ലിക്കായി പോസ്റ്റ് ചെയ്യുക", feedHeading: "പബ്ലിക് ഫീഡ്", emptyFeed: "ഇതുവരെ ഒന്നും പോസ്റ്റ് ചെയ്തിട്ടില്ല. ആദ്യം നിങ്ങൾ സംസാരിക്കൂ.", deleteBtn: "ഒഴിവാക്കുക", allFilter: "എല്ലാം", loading: "ലോഡ് ചെയ്യുന്നു…", postedMsg: "പോസ്റ്റ് ചെയ്തു.", postFail: "പോസ്റ്റ് ചെയ്യാനായില്ല — വീണ്ടും ശ്രമിക്കുക.", addSomething: "ആദ്യം ഒരു തലക്കെട്ടും വിവരങ്ങളും ചേർക്കുക.", recording: "റെക്കോർഡിംഗ് നടക്കുന്നു…", tooLong: "ഇത് അല്പം ദൈർഘ്യമേറിയതാണ് — വോയ്സ് നോട്ട് ചെറുതാക്കുക.", tooBig: "ആ ഫയൽ വളരെ വലുതാണ് — ചെറിയ ഫോട്ടോ ശ്രമിക്കുക.",
    catPolice: "പോലീസ് ക്രൂരത", catCorruption: "അഴിമതി", catHumanRights: "മനുഷ്യാവകാശങ്ങൾ", catEnvironment: "പരിസ്ഥിതി", catPublicServices: "പൊതുസേവനങ്ങൾ", catOther: "മറ്റുള്ളവ"
  },
  pa: {
    appName: "LoudNote", tagline: "ਇੱਕ ਵਾਰ ਬੋਲੋ। ਸਭ ਨੂੰ ਸੁਣਨ ਦਿਓ।", publicTitle: "ਪੋਸਟ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ", publicBody: "ਇੱਥੇ ਸਭ ਕੁਝ ਜਨਤਕ ਹੈ — ਸਰਕਾਰ ਸਮੇਤ ਕੋਈ ਵੀ ਇਸਨੂੰ ਦੇਖ ਸਕਦਾ ਹੈ। ਜੇਕਰ ਤੁਸੀਂ ਗੁਮਨਾਮ ਰਹਿਣਾ ਚਾਹੁੰਦੇ ਹੋ ਤਾਂ ਆਪਣਾ ਨਾਮ ਜਾਂ ਚਿਹਰਾ ਨਾ ਪਾਓ।", composeCta: "ਆਪਣੀ ਆਵਾਜ਼ ਜੋੜੋ", typeText: "ਟੈਕਸਟ", typePhoto: "ਫੋਟੋ", typeVoice: "ਵੌਇਸ ਨੋਟ", typeVideo: "ਵੀਡੀਓ ਲਿੰਕ", typeDrawing: "ਸਕੈਚ", titleLabel: "ਸਿਰਲੇਖ", titlePh: "ਇਹ ਕਿਸ ਬਾਰੇ ਹੈ?", categoryLabel: "ਸ਼੍ਰੇਣੀ", textLabel: "ਤੁਹਾਡਾ ਸੰਦੇਸ਼", textPh: "ਦੱਸੋ ਕੀ ਹੋਇਆ", videoLinkLabel: "ਵੀਡੀਓ ਲਿੰਕ ਪੇਸਟ ਕਰੋ", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "ਰਿਕਾਰਡ ਕਰੋ", stopBtn: "ਰੋਕੋ", retakeBtn: "ਦੁਬਾਰਾ ਰਿਕਾਰਡ ਕਰੋ", chooseFileBtn: "ਫੋਟੋ ਚੁਣੋ", clearDrawing: "ਸਾਫ਼ ਕਰੋ", postBtn: "ਜਨਤਕ ਤੌਰ 'ਤੇ ਪੋਸਟ ਕਰੋ", feedHeading: "ਪਬਲਿਕ ਫੀਡ", emptyFeed: "ਅਜੇ ਤੱਕ ਕੁਝ ਵੀ ਪੋਸਟ ਨਹੀਂ ਕੀਤਾ ਗਿਆ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਤੁਸੀਂ ਬੋਲੋ।", deleteBtn: "ਹਟਾਓ", allFilter: "ਸਭ", loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…", postedMsg: "ਪੋਸਟ ਹੋ ਗਿਆ।", postFail: "ਪੋਸਟ ਨਹੀਂ ਹੋ ਸਕਿਆ — ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।", addSomething: "ਪਹਿਲਾਂ ਇੱਕ ਸਿਰਲੇਖ ਅਤੇ ਕੁਝ ਸਮੱਗਰੀ ਜੋੜੋ।", recording: "ਰਿਕਾਰਡਿੰਗ ਹੋ ਰਹੀ ਹੈ…", tooLong: "ਇਹ ਸਕੋੜਾ ਲੰਬਾ ਹੈ — ਵੌਇਸ ਨੋਟ ਛੋਟਾ ਰੱਖੋ।", tooBig: "ਉਹ ਫਾਈਲ ਬਹੁਤ ਵੱਡੀ ਹੈ — ਛੋਟੀ ਫੋਟੋ ਚੁਣੋ।",
    catPolice: "ਪੁਲਿਸ ਬਰਬਰਤਾ", catCorruption: "ਭ੍ਰਿਸ਼ਟਾਚਾਰ", catHumanRights: "ਮਨੁੱਖੀ ਅਧਿਕਾਰ", catEnvironment: "ਵਾਤਾਵਰਣ", catPublicServices: "ਜਨਤਕ ਸੇਵਾਵਾਂ", catOther: "ਹੋਰ"
  },
  or: {
    appName: "LoudNote", tagline: "ଥରେ କୁହନ୍ତୁ। ସମସ୍ତଙ୍କୁ ଶୁଣିବାକୁ ଦିଅନ୍ତୁ।", publicTitle: "ପୋଷ୍ଟ କରିବା ପୂର୍ବରୁ", publicBody: "ଏଠାରେ ସବୁକିଛି ସାର୍ବଜନୀନ — ସରକାରଙ୍କ ସମେତ ଯେକେହି ଏହାକୁ ଦେଖିପାରିବେ। ଯଦି ଆପଣ ଅଜ୍ଞାତ ରହିବାକୁ ଚାହାଁନ୍ତି, ତେବେ ଆପଣଙ୍କ ନାମ କିମ୍ବା ମୁହଁ ସାମିଲ କରନ୍ତୁ ନାହିଁ।", composeCta: "ଆପଣଙ୍କ ସ୍ୱର ଯୋଡ଼ନ୍ତୁ", typeText: "ଟେକ୍ସଟ୍", typePhoto: "ଫୋଟୋ", typeVoice: "ଭଏସ୍ ନୋଟ୍", typeVideo: "ଭିଡିଓ ଲିଙ୍କ୍", typeDrawing: "ସ୍କେଚ୍", titleLabel: "ଶୀର୍ଷକ", titlePh: "ଏହା କାହା ବିଷୟରେ?", categoryLabel: "ବର୍ଗ", textLabel: "ଆପଣଙ୍କ ସନ୍ଦେଶ", textPh: "କ’ଣ ଘଟିଲା କୁହନ୍ତୁ", videoLinkLabel: "ଭିଡିଓ ଲିଙ୍କ୍ ପେଷ୍ଟ କରନ୍ତୁ", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "ରେକର୍ଡ କରନ୍ତୁ", stopBtn: "ଅଟକାନ୍ତୁ", retakeBtn: "ପୁନର୍ବାର ରେକର୍ଡ କରନ୍ତୁ", chooseFileBtn: "ଫୋଟୋ ବାଛନ୍ତୁ", clearDrawing: "ସଫା କରନ୍ତୁ", postBtn: "ସାର୍ବଜନୀନ ପୋଷ୍ଟ କରନ୍ତୁ", feedHeading: "ପବ୍ଲିକ୍ ଫିଡ୍", emptyFeed: "ଏପର୍ଯ୍ୟନ୍ତ କିଛି ପୋଷ୍ଟ ହୋଇନାହିଁ। ପ୍ରଥମେ ଆପଣ କୁହନ୍ତୁ।", deleteBtn: "କାଢ଼ି ଦିଅନ୍ତୁ", allFilter: "ସମସ୍ତ", loading: "ଲୋଡ୍ ହେଉଛି…", postedMsg: "ପୋଷ୍ଟ ହୋଇଗଲା।", postFail: "ପୋଷ୍ଟ ହୋଇପାରିଲା ନାହିଁ — ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", addSomething: "ପ୍ରଥମେ ଏକ ଶୀର୍ଷକ ଏବଂ କିଛି ବିଷୟବସ୍ତୁ ଯୋଡ଼ନ୍ତୁ।", recording: "ରେକର୍ଡିଂ ହେଉଛି…", tooLong: "ଏହା ଟିକେ ଲମ୍ବା — ଭଏସ୍ ନୋଟ୍ ଛୋଟ ରଖନ୍ତୁ।", tooBig: "ସେହି ଫାଇଲ୍ ଅତ୍ୟଧିକ ବଡ଼ — ଛୋଟ ଫୋଟୋ ବାଛନ୍ତୁ।",
    catPolice: "ପୋଲିସ ବର୍ବରତା", catCorruption: "ଦୁର୍ନୀତି", catHumanRights: "ମାନବାଧିକାର", catEnvironment: "ପରିବେଶ", catPublicServices: "ଜନସେବା", catOther: "ଅନ୍ୟାନ୍ୟ"
  },
  as: {
    appName: "LoudNote", tagline: "এবাৰ কওক। সকলোকে শুনিবলৈ দিয়ক।", publicTitle: "পোষ্ট কৰাৰ আগতে", publicBody: "ইয়াত থকা সকলোবোৰ ৰাজহুৱা — চৰকাৰকে ধৰি যিকোনো ব্যক্তিয়ে ইয়াক চাব পাৰে। আপুনি যদি বেনামী হৈ থাকিব বিচাৰে তেন্তে আপোনাৰ নাম বা মুখমণ্ডল অন্তৰ্ভুক্ত নকৰিব।", composeCta: "আপোনাৰ মাত যোগ কৰক", typeText: "টেক্সট", typePhoto: "ফটো", typeVoice: "ভয়েচ নোট", typeVideo: "ভিডিঅ’ লিংক", typeDrawing: "স্কেচ", titleLabel: "শীৰ্ষক", titlePh: "এইটো কিহৰ বিষয়ে?", categoryLabel: "শ্ৰেণী", textLabel: "আপোনাৰ বার্তা", textPh: "কি হ’ল কওক", videoLinkLabel: "ভিডিঅ’ লিংক পেষ্ট কৰক", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "ৰে কৰ্ড কৰক", stopBtn: "বন্ধ কৰক", retakeBtn: "পুনৰ ৰেকৰ্ড কৰক", chooseFileBtn: "ফটো বাছক", clearDrawing: "মচি পেলাওক", postBtn: "ৰাজহুৱাকৈ পোষ্ট কৰক", feedHeading: "ৰাজহুৱা ফিড", emptyFeed: "এতিয়ালৈকে একো পোষ্ট কৰা হোৱা নাই। প্ৰথমে আপুনি কওক।", deleteBtn: "আঁতৰাওক", allFilter: "সকলো", loading: "লোড হৈ আছে…", postedMsg: "পোষ্ট কৰা হ’ল।", postFail: "পোষ্ট কৰিব পৰা নগ’ল — পুনৰ চেষ্টা কৰক।", addSomething: "প্ৰথমে এটা শীৰ্ষক আৰু কিছু বিষয়বস্তু যোগ কৰক।", recording: "ৰেকৰ্ডিং হৈ আছে…", tooLong: "এইটো অলপ দীঘলীয়া — ভয়েচ নোট ছুটি ৰাখক।", tooBig: "সেই ফাইলটো অতি ডাঙৰ — সৰু ফটো এটা বাছক।",
    catPolice: " আৰক্ষীৰ বৰ্বৰতা", catCorruption: " দুৰ্নীতি", catHumanRights: "মানৱ অধিকাৰ", catEnvironment: "পৰিৱেশ", catPublicServices: "ৰাজহুৱা সেৱা", catOther: "অন্যান্য"
  },
  ur: {
    appName: "LoudNote", tagline: "ایک بار کہیں۔ سب کو سننے دیں۔", publicTitle: "پوسٹ کرنے سے پہلے", publicBody: "یہاں سب کچھ عوامی ہے — حکومت سمیت کوئی بھی اسے دیکھ سکتا ہے۔ اگر آپ گمنام رہنا چاہتے ہیں تو اپنا نام یا چہرہ شامل نہ کریں۔", composeCta: "اپنی آواز شامل کریں", typeText: "ٹیکسٹ", typePhoto: "تصویر", typeVoice: "وائس نوٹ", typeVideo: "ویڈیو لنک", typeDrawing: "خاکہ", titleLabel: "عنوان", titlePh: "یہ کس بارے میں ہے؟", categoryLabel: "زمرہ", textLabel: "آپ کا پیغام", textPh: "بتائیں کیا ہوا", videoLinkLabel: "ویڈیو لنک پیسٹ کریں", videoLinkPh: "YouTube, Instagram, X…", recordBtn: "ریکارڈ کریں", stopBtn: "روکیں", retakeBtn: "دوبارہ ریکارڈ کریں", chooseFileBtn: "تصویر منتخب کریں", clearDrawing: "صاف کریں", postBtn: "عوامی طور پر پوسٹ کریں", feedHeading: "پبلک فیڈ", emptyFeed: "ابھی تک کچھ پوسٹ نہیں ہوا اندازہ لگائیں اور پہلے آپ بولیں۔", deleteBtn: "ہٹائیں", allFilter: "سبھی", loading: "لوڈ ہو رہا ہے…", postedMsg: "پوسٹ ہو گیا۔", postFail: "پوسٹ نہیں ہو سکا — دوبارہ کوشش کریں۔", addSomething: "پہلے عنوان اور کچھ مواد شامل کریں۔", recording: "ریکارڈنگ ہو رہی ہے…", tooLong: "یہ کچھ طویل ہے — وائس نوٹ مختصر رکھیں۔", tooBig: "فائل بہت بڑی ہے — چھوٹی تصویر منتخب کریں۔",
    catPolice: "پولیس کا تشدد", catCorruption: "بدعنوانی", catHumanRights: "انسانی حقوق", catEnvironment: "ماحول", catPublicServices: "عوامی خدمات", catOther: "دیگر"
  }
};

const POST_TYPES = [
  { key: "text", icon: Type },
  { key: "photo", icon: ImageIcon },
  { key: "voice", icon: Mic },
  { key: "video", icon: VideoIcon },
  { key: "drawing", icon: PenTool },
];

function youtubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  return m ? m[1] : null;
}

export default function LoudNote() {
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const [postType, setPostType] = useState("text");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CAT_KEYS[0]);
  const [text, setText] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [photoData, setPhotoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [drawingData, setDrawingData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState({ msg: "", type: "" });

  const canvasRef = useRef(null);
  const drawingCtx = useRef(null);
  const isDrawing = useRef(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const recordTimeout = useRef(null);

  const t = (key) => (T[lang] && T[lang][key]) || T.en[key] || key;
  const isRTL = lang === "ur";

  useEffect(() => {
    (async () => {
      try {
        if (window.storage) {
          const res = await window.storage.get("lang-pref", false);
          if (res && res.value && T[res.value]) setLang(res.value);
        }
      } catch (e) {}
      await loadPosts();
    })();
  }, []);

  const initCanvas = () => {
    if (postType === "drawing" && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 300;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#1a1430";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      drawingCtx.current = ctx;
    }
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [postType]);

  async function loadPosts() {
    setLoading(true);
    try {
      if (window.storage) {
        const keysRes = await window.storage.list("post:", true);
        const keys = (keysRes && keysRes.keys) || [];
        const items = [];
        for (const key of keys) {
          try {
            const res = await window.storage.get(key, true);
            if (res && res.value) items.push({ id: key, ...JSON.parse(res.value) });
          } catch (e) {}
        }
        items.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(items);
      }
    } catch (e) {}
    setLoading(false);
  }

  async function changeLang(code) {
    setLang(code);
    setLangOpen(false);
    try { 
      if (window.storage) await window.storage.set("lang-pref", code, false); 
    } catch (e) {}
  }

  function resetComposer() {
    setTitle(""); setText(""); setVideoLink(""); setPhotoData(null); setAudioData(null); setDrawingData(null);
  }

  function handlePhotoFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.onload = () => {
        const maxW = 800;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        if (dataUrl.length > 1_800_000) {
          setStatus({ msg: t("tooBig"), type: "error" });
          return;
        }
        setPhotoData(dataUrl);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorder.current = mr;
      mr.ondataavailable = (e) => audioChunks.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result.length > 1_800_000) {
            setStatus({ msg: t("tooLong"), type: "error" });
          } else {
            setAudioData(reader.result);
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((tr) => tr.stop());
      };
      mr.start();
      setIsRecording(true);
      recordTimeout.current = setTimeout(() => stopRecording(), 20000);
    } catch (e) {
      setStatus({ msg: t("tooBig"), type: "error" });
    }
  }

  function stopRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    clearTimeout(recordTimeout.current);
    setIsRecording(false);
  }

  function getPos(e) {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function drawStart(e) {
    isDrawing.current = true;
    const { x, y } = getPos(e);
    if (drawingCtx.current) {
      drawingCtx.current.beginPath();
      drawingCtx.current.moveTo(x, y);
    }
  }

  function drawMove(e) {
    if (!isDrawing.current || !drawingCtx.current) return;
    const { x, y } = getPos(e);
    drawingCtx.current.lineTo(x, y);
    drawingCtx.current.stroke();
  }

  function drawEnd() {
    isDrawing.current = false;
    if (canvasRef.current) setDrawingData(canvasRef.current.toDataURL("image/png"));
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (canvas && drawingCtx.current) {
      drawingCtx.current.fillStyle = "#ffffff";
      drawingCtx.current.fillRect(0, 0, canvas.width, canvas.height);
      setDrawingData(null);
    }
  }

  async function handlePost() {
    const hasContent =
      (postType === "text" && text.trim()) ||
      (postType === "photo" && photoData) ||
      (postType === "voice" && audioData) ||
      (postType === "video" && videoLink.trim()) ||
      (postType === "drawing" && drawingData);
    if (!title.trim() || !hasContent) {
      setStatus({ msg: t("addSomething"), type: "error" });
      return;
    }
    setStatus({ msg: "", type: "" });
    try {
      const record = {
        type: postType,
        category,
        title: title.trim(),
        text: text.trim(),
        videoLink: videoLink.trim(),
        photoData,
        audioData,
        drawingData,
        createdAt: Date.now(),
      };
      const id = "post:" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
      if (window.storage) {
        const result = await window.storage.set(id, JSON.stringify(record), true);
        if (!result) throw new Error("fail");
      }
      resetComposer();
      setStatus({ msg: t("postedMsg"), type: "ok" });
      await loadPosts();
    } catch (e) {
      setStatus({ msg: t("postFail"), type: "error" });
    }
  }

  async function handleDelete(id) {
    try { 
      if (window.storage) {
        await window.storage.delete(id, true); 
        await loadPosts(); 
      }
    } catch (e) {}
  }

  const filteredPosts = posts.filter((p) => {
    if (filterType !== "All" && p.type !== filterType) return false;
    if (filterCat !== "All" && p.category !== filterCat) return false;
    return true;
  });

  return (
    <div style={{ ...styles.wrap, direction: isRTL ? "rtl" : "ltr" }}>
      <style>{fontImport}</style>
      <style>{responsiveCSS}</style>
      <div style={{ ...styles.blob, width: 340, height: 340, background: "#ff2e88", top: -100, left: -80 }} />
      <div style={{ ...styles.blob, width: 280, height: 280, background: "#ffd23f", bottom: -80, right: -60 }} />

      <div style={{ ...styles.langWrap, [isRTL ? "left" : "right"]: 14 }}>
        <button style={styles.langBtn} onClick={() => setLangOpen((o) => !o)}>
          <Globe size={14} /> {LANGS.find((l) => l.code === lang)?.label || "English"}
        </button>
        {langOpen && (
          <div style={{ ...styles.langMenu, [isRTL ? "left" : "right"]: 0 }}>
            {LANGS.map((l) => (
              <div key={l.code} style={{ ...styles.langItem, background: l.code === lang ? "rgba(255,255,255,0.1)" : "transparent" }} onClick={() => changeLang(l.code)}>
                {l.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <header style={styles.header}>
        <Megaphone size={22} color="#ffd23f" />
        <span style={styles.brand}>{t("appName")}</span>
      </header>

      <p style={styles.tagline}>{t("tagline")}</p>

      <div style={styles.noticeBox}>
        <b style={{ display: "block", marginBottom: 4 }}>{t("publicTitle")}</b>
        <span style={{ color: "#c9c2e0", fontSize: 13, lineHeight: 1.5 }}>{t("publicBody")}</span>
      </div>

      <main className="ln-main" style={styles.main}>
        <section style={styles.panel}>
          <h3 style={styles.panelTitle}>{t("composeCta")}</h3>

          <div style={styles.typeRow} className="ln-scroll-row">
            {POST_TYPES.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setPostType(key); setStatus({ msg: "", type: "" }); }}
                style={{ ...styles.typeBtn, ...(postType === key ? styles.typeBtnActive : {}) }}
              >
                <Icon size={16} /> {t("type" + key.charAt(0).toUpperCase() + key.slice(1))}
              </button>
            ))}
          </div>

          <label style={styles.label}>{t("titleLabel")}</label>
          <input style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("titlePh")} />

          <label style={styles.label}>{t("categoryLabel")}</label>
          <select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CAT_KEYS.map((k) => (
              <option key={k} value={k} style={styles.selectOption}>
                {CAT_EMOJI[k]} {t(k) || k}
              </option>
            ))}
          </select>

          {postType === "text" && (
            <>
              <label style={styles.label}>{t("textLabel")}</label>
              <textarea style={{ ...styles.input, minHeight: 100, resize: "vertical" }} value={text} onChange={(e) => setText(e.target.value)} placeholder={t("textPh")} />
            </>
          )}

          {postType === "photo" && (
            <div style={{ marginTop: 14 }}>
              <label style={styles.fileBtn}>
                <ImageIcon size={16} /> {t("chooseFileBtn")}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoFile} />
              </label>
              {photoData && <img src={photoData} alt="" style={{ width: "100%", borderRadius: 14, marginTop: 10 }} />}
            </div>
          )}

          {postType === "voice" && (
            <div style={{ marginTop: 14, textAlign: "center" }}>
              {!isRecording ? (
                <button style={styles.btn} onClick={startRecording}><Mic size={16} /> {t("recordBtn")}</button>
              ) : (
                <button style={{ ...styles.btn, background: "#ff2e88" }} onClick={stopRecording}><Square size={16} /> {t("stopBtn")}</button>
              )}
              {isRecording && <div style={{ marginTop: 8, fontSize: 12, color: "#ffd23f" }}>{t("recording")}</div>}
              {audioData && !isRecording && (
                <div style={{ marginTop: 10 }}>
                  <audio controls src={audioData} style={{ width: "100%" }} />
                </div>
              )}
            </div>
          )}

          {postType === "video" && (
            <>
              <label style={styles.label}>{t("videoLinkLabel")}</label>
              <input style={styles.input} value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder={t("videoLinkPh")} />
              {videoLink && youtubeId(videoLink) && (
                <div style={{ marginTop: 10, borderRadius: 14, overflow: "hidden" }}>
                  <iframe
                    width="100%" height="180"
                    src={`https://www.youtube.com/embed/${youtubeId(videoLink)}`}
                    title="preview" frameBorder="0" allowFullScreen
                  />
                </div>
              )}
            </>
          )}

          {postType === "drawing" && (
            <div style={{ marginTop: 14 }}>
              <div style={{ width: "100%", overflow: "hidden", borderRadius: 14, background: "#fff" }}>
                <canvas
                  ref={canvasRef}
                  style={{ width: "100%", height: "200px", display: "block", touchAction: "none" }}
                  onMouseDown={drawStart} onMouseMove={drawMove} onMouseUp={drawEnd} onMouseLeave={drawEnd}
                  onTouchStart={drawStart} onTouchMove={drawMove} onTouchEnd={drawEnd}
                />
              </div>
              <button style={{ ...styles.btn, marginTop: 10, background: "rgba(255,255,255,0.08)", color: "#f5f2ff" }} onClick={clearCanvas}>
                <X size={14} /> {t("clearDrawing")}
              </button>
            </div>
          )}

          <button style={{ ...styles.btn, width: "100%", marginTop: 18 }} onClick={handlePost}>
            <Megaphone size={16} /> {t("postBtn")}
          </button>
          {status.msg && (
            <div style={{ marginTop: 8, fontSize: 12, color: status.type === "error" ? "#ff6b6b" : "#34e0a1" }}>{status.msg}</div>
          )}
        </section>

        <section style={styles.panel}>
          <h3 style={styles.panelTitle}>{t("feedHeading")}</h3>

          <div style={styles.chipsRow} className="ln-scroll-row">
            <button style={{ ...styles.chip, ...(filterType === "All" ? styles.chipActive : {}) }} onClick={() => setFilterType("All")}>{t("allFilter")}</button>
            {POST_TYPES.map(({ key, icon: Icon }) => (
              <button key={key} style={{ ...styles.chip, ...(filterType === key ? styles.chipActive : {}) }} onClick={() => setFilterType(key)}>
                <Icon size={12} /> {t("type" + key.charAt(0).toUpperCase() + key.slice(1))}
              </button>
            ))}
          </div>
          <div style={styles.chipsRow} className="ln-scroll-row">
            <button style={{ ...styles.chip, ...(filterCat === "All" ? styles.chipActive : {}) }} onClick={() => setFilterCat("All")}>{t("allFilter")}</button>
            {CAT_KEYS.map((k) => (
              <button key={k} style={{ ...styles.chip, ...(filterCat === k ? styles.chipActive : {}) }} onClick={() => setFilterCat(k)}>
                {CAT_EMOJI[k]} {t(k)}
              </button>
            ))}
          </div>

          {loading && <div style={styles.empty}>{t("loading")}</div>}
          {!loading && filteredPosts.length === 0 && <div style={styles.empty}>{t("emptyFeed")}</div>}

          {!loading && filteredPosts.map((p) => (
            <div key={p.id} style={styles.postCard}>
              <div style={styles.postMeta}>
                <span>{new Date(p.createdAt).toLocaleString()}</span>
                <span style={styles.catTag}>{CAT_EMOJI[p.category] || "✨"} {t(p.category) || p.category}</span>
              </div>
              <h4 style={{ margin: "0 0 6px" }}>{p.title}</h4>
              {p.type === "text" && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{p.text}</p>}
              {p.type === "photo" && p.photoData && <img src={p.photoData} alt="" style={{ width: "100%", borderRadius: 12, marginTop: 6 }} />}
              {p.type === "voice" && p.audioData && <audio controls src={p.audioData} style={{ width: "100%", marginTop: 6 }} />}
              {p.type === "drawing" && p.drawingData && <img src={p.drawingData} alt="" style={{ width: "100%", borderRadius: 12, marginTop: 6, background: "#fff" }} />}
              {p.type === "video" && p.videoLink && (
                youtubeId(p.videoLink) ? (
                  <div style={{ marginTop: 6, borderRadius: 12, overflow: "hidden" }}>
                    <iframe width="100%" height="180" src={`https://www.youtube.com/embed/${youtubeId(p.videoLink)}`} title="video" frameBorder="0" allowFullScreen />
                  </div>
                ) : (
                  <a href={p.videoLink} target="_blank" rel="noopener noreferrer" style={{ color: "#3fd6ff", fontSize: 13, wordBreak: "break-all" }}>{p.videoLink}</a>
                )
              )}
              <div style={{ textAlign: isRTL ? "left" : "right", marginTop: 8 }}>
                <button style={styles.delBtn} onClick={() => handleDelete(p.id)}><Trash2 size={12} /> {t("deleteBtn")}</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');`;

const responsiveCSS = `
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  @media (max-width: 800px) {
    .ln-main { 
      grid-template-columns: 1fr !important; 
      width: 100% !important;
    }
  }
  .ln-scroll-row {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    max-width: 100%;
  }
  .ln-scroll-row::-webkit-scrollbar {
    display: none;
  }
`;

const styles = {
  wrap: { position: "relative", minHeight: "100vh", width: "100%", background: "#12101c", color: "#f5f2ff", fontFamily: "'Inter','Noto Sans',system-ui,sans-serif", overflowX: "hidden", padding: "12px 12px 60px" },
  blob: { position: "fixed", borderRadius: "50%", filter: "blur(80px)", opacity: 0.3, zIndex: 0, pointerEvents: "none" },
  langWrap: { position: "fixed", top: 14, zIndex: 30 },
  langBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#f5f2ff", padding: "8px 14px", borderRadius: 20, fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", touchAction: "manipulation" },
  langMenu: { position: "absolute", top: "110%", width: 170, maxHeight: 260, overflowY: "auto", background: "#1e1a30", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 6, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" },
  langItem: { padding: "10px 12px", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  header: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8, justifyContent: "center", paddingTop: 36, fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 24 },
  brand: { background: "linear-gradient(90deg,#ff2e88,#ffd23f)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" },
  tagline: { position: "relative", zIndex: 1, textAlign: "center", color: "#c9c2e0", fontSize: 13, margin: "6px 0 18px" },
  noticeBox: { position: "relative", zIndex: 1, maxWidth: 640, width: "100%", margin: "0 auto 22px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 16px", backdropFilter: "blur(10px)" },
  main: { position: "relative", zIndex: 1, maxWidth: 1000, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)", gap: 20 },
  panel: { background: "rgba(255,255,255,0.045)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: 16, width: "100%", minWidth: 0 },
  panelTitle: { margin: "0 0 14px", fontFamily: "'Poppins',sans-serif", fontSize: 16 },
  typeRow: { display: "flex", gap: 8, marginBottom: 14, paddingBottom: 4 },
  typeBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#c9c2e0", fontSize: 13, cursor: "pointer", flexShrink: 0, touchAction: "manipulation" },
  typeBtnActive: { background: "linear-gradient(90deg,#ff2e88,#ff6b4a)", color: "#fff", border: "1px solid transparent" },
  label: { display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a79bc9", margin: "12px 0 6px" },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#f5f2ff", fontSize: 14, outline: "none" },
  selectOption: { background: "#1e1a30", color: "#f5f2ff" },
  fileBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 13, cursor: "pointer", touchAction: "manipulation" },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 18px", borderRadius: 16, border: "none", cursor: "pointer", background: "linear-gradient(90deg,#ff2e88,#ffd23f)", color: "#1a1305", fontWeight: 700, fontSize: 14, touchAction: "manipulation" },
  chipsRow: { display: "flex", gap: 8, marginBottom: 10, paddingBottom: 4 },
  chip: { display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "#a79bc9", fontSize: 12, cursor: "pointer", flexShrink: 0, touchAction: "manipulation" },
  chipActive: { background: "linear-gradient(90deg,#ff2e88,#8b5cf6)", color: "#fff", border: "1px solid transparent" },
  postCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 16, marginBottom: 12, width: "100%" },
  postMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#a79bc9", marginBottom: 8, fontFamily: "monospace", flexWrap: "wrap", gap: 6 },
  catTag: { background: "rgba(139,92,246,0.25)", padding: "2px 9px", borderRadius: 10, fontSize: 11 },
  delBtn: { display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#a79bc9", fontSize: 11, cursor: "pointer", textDecoration: "underline", padding: "6px 0" },
  empty: { textAlign: "center", padding: "30px 10px", color: "#a79bc9", fontSize: 13 },
};
