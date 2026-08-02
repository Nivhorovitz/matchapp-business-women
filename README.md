# Spark Match | מועדון נשות עסקים | Hebrew version

גרסה עברית של Spark Match, מותאמת למועדון נשות עסקים.

## מה יש בגרסה

- ממשק עברי RTL
- קהילה נפרדת ב-Supabase:
  `Spark Match - מועדון נשות עסקים`
- תגיות מותאמות לעולם של עצמאיות, יזמיות ובעלות עסקים
- שלושה סוגי חיבור:
  - שותפת תרגול
  - שותפת אחריות
  - התאמת מנטורית
- תיאום פגישה בתוך החדר:
  `בתוך החדר · שולחן Spark Match`
- מצב דמו מוסתר עם `?demo=true`

## לפני שימוש

הרץ ב-Supabase SQL Editor את:

`supabase_business_women_he_setup.sql`

## בדיקה

פתח:
`https://nivhorovitz.github.io/<repo-name>/?demo=true`

כדי להציג כפתור יצירת פרופילי דמו.

לשימוש רגיל בחדר:
`https://nivhorovitz.github.io/<repo-name>/`

## הערת אבטחה

זו עדיין גרסת MVP. לפני שימוש עם פרטי קשר אמיתיים בקהילה פעילה, כדאי להוסיף Supabase Auth ו-RLS מדויק יותר.


## v1.1 tag fix

תיקון תגיות מסלול שנשארו באנגלית.


## BW v1.2 hard frontend tag fix

Fixed remaining hard-coded English tags in `app.js`.
