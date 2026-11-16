# English Guru — GitHub Actions দিয়ে APK বিল্ড গাইড

এই ফোল্ডারের `.github/workflows/build-apk.yml` ফাইলটি দিয়ে GitHub-এ পুশ করলেই স্বয়ংক্রিয়ভাবে APK তৈরি হবে।

## ধাপে ধাপে:

### ১. GitHub অ্যাকাউন্ট (ফ্রি)
[github.com](https://github.com) এ সাইন আপ করুন।

### ২. নতুন রিপোজিটরি
- **New** → Repository name: `english-guru` → **Public** বা **Private** → **Create repository**

### ৩. ফাইল আপলোড
- রিপোতে **Add file → Upload files**
- এই ফোল্ডারের **সব ফাইল** ড্র্যাগ-ড্রপ করুন (`.github` ফোল্ডারসহ — এটা লুকানো ফোল্ডার, আপনার ফাইল ম্যানেজারে দেখতে হিডেন ফাইল দেখান)
- **Commit changes**

### ৪. APK বিল্ড চালান
- রিপোর **Actions** ট্যাব → বাম দিকে **Build APK** → **Run workflow** → **Run workflow**
- ৩-৫ মিনিট অপেক্ষা করুন
- সবুজ ✓ হলে: **Releases** সেকশনে যান → `EnglishGuru.apk` ডাউনলোড করুন
- অথবা Actions → সর্বশেষ run → নিচে **Artifacts** → `EnglishGuru-APK`

### ৫. ফোনে ইনস্টল
- APK ফাইল ফোনে নিয়ে যান
- Settings → "Unknown sources" অনুমতি দিন
- APK ট্যাপ → Install

> **টিপ:** প্রথমবার "Play Protect" সতর্কতা দেখাতে পারে — "Install anyway" চাপুন (নিজের বানানো অ্যাপ)।

## Play Store-এর জন্য (পরে)

Debug APK টেস্টিংয়ের জন্য ভালো। Play Store চাইলে signed release দরকার:

1. Android Studio ইনস্টল করুন
2. `android` ফোল্ডার খুলুন → **Build → Generate Signed Bundle/APK → APK**
3. নতুন keystore তৈরি করুন (পাসওয়ার্ড সংরক্ষণ করুন!)
4. `app-release.apk` Play Console-এ আপলোড করুন

অথবা GitHub Actions-এ signing secrets যোগ করে release build করা যায় — চাইলে বলবেন, ওয়ার্কফ্লো আপডেট করে দেবো।
