-- Seed data for hospitals in China (realistic data for medical service MVP)
-- All hospitals have multilingual support (EN, ZH, JA, KO)

-- Clear existing data (idempotent)
TRUNCATE TABLE hospitals CASCADE;

-- Insert 10 major hospitals in China with international departments
INSERT INTO hospitals (
  id, name, name_zh, name_ja, name_ko,
  description, description_zh, description_ja, description_ko,
  address, coordinates, phone, email, website,
  rating, review_count, specialties, languages_supported,
  has_international_department, opening_hours, is_verified, is_active
) VALUES
-- 1. Beijing United Family Hospital (Beijing)
(
  '11111111-1111-1111-1111-111111111111',
  'Beijing United Family Hospital',
  '北京和睦家医院',
  '北京ユナイテッドファミリーホスピタル',
  '베이징 유나이티드 패밀리 병원',
  'Premium international hospital in Beijing offering comprehensive medical services with English-speaking staff.',
  '北京高端国际医院，提供全面的医疗服务，配备英语工作人员。',
  '北京の高級国際病院で、英語を話すスタッフがいる総合的な医療サービスを提供しています。',
  '베이징의 프리미엄 국제 병원으로 영어를 구사하는 직원이 있는 종합 의료 서비스를 제공합니다.',
  '{"street": "2 Jiangtai Road", "district": "Chaoyang District", "city": "Beijing", "province": "Beijing", "country": "China", "postal_code": "100016"}',
  ST_GeogFromText('POINT(116.4700 39.9042)'),
  '+86-10-5927-7000',
  'info@ufh.com.cn',
  'https://www.ufh.com.cn',
  4.8,
  1245,
  '{"Cardiology", "Pediatrics", "Obstetrics", "Orthopedics", "Dermatology", "Dentistry"}',
  '{"en", "zh", "ja", "ko", "fr", "de"}',
  true,
  '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 2. Shanghai East International Medical Center
(
  '22222222-2222-2222-2222-222222222222',
  'Shanghai East International Medical Center',
  '上海东方国际医疗中心',
  '上海東方国際医療センター',
  '상하이 동방 국제 의료 센터',
  'Modern medical center in Shanghai with international standards and multilingual medical teams.',
  '上海现代化医疗中心，符合国际标准，配备多语言医疗团队。',
  '上海の近代的な医療センターで、国際基準を満たし、多言語医療チームがいます。',
  '상하이의 현대적인 의료 센터로 국제 기준을 충족하며 다국어 의료 팀이 있습니다.',
  '{"street": "1500 Century Avenue", "district": "Pudong New Area", "city": "Shanghai", "province": "Shanghai", "country": "China", "postal_code": "200122"}',
  ST_GeogFromText('POINT(121.4737 31.2304)'),
  '+86-21-5879-9999',
  'contact@seimc.com',
  'https://www.seimc.com',
  4.7,
  987,
  '{"Internal Medicine", "Surgery", "Pediatrics", "Gynecology", "Ophthalmology", "ENT"}',
  '{"en", "zh", "ja", "ko", "es"}',
  true,
  '{"monday": "08:30-19:00", "tuesday": "08:30-19:00", "wednesday": "08:30-19:00", "thursday": "08:30-19:00", "friday": "08:30-19:00", "saturday": "09:00-17:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 3. Guangzhou International Medical Center
(
  '33333333-3333-3333-3333-333333333333',
  'Guangzhou International Medical Center',
  '广州国际医疗中心',
  '広州国際医療センター',
  '광저우 국제 의료 센터',
  'Leading medical center in Southern China with specialized international patient services.',
  '华南地区领先的医疗中心，提供专业的国际患者服务。',
  '華南地域をリードする医療センターで、専門的な国際患者サービスを提供しています。',
  '화남 지역을 선도하는 의료 센터로 전문적인 국제 환자 서비스를 제공합니다.',
  '{"street": "1 Zhujiang East Road", "district": "Tianhe District", "city": "Guangzhou", "province": "Guangdong", "country": "China", "postal_code": "510623"}',
  ST_GeogFromText('POINT(113.2806 23.1251)'),
  '+86-20-3888-8888',
  'info@gzimc.com',
  'https://www.gzimc.com',
  4.6,
  856,
  '{"Cardiology", "Neurology", "Oncology", "Urology", "Dermatology", "Traditional Chinese Medicine"}',
  '{"en", "zh", "ja", "ko", "ar"}',
  true,
  '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 4. Chengdu International Medical Center
(
  '44444444-4444-4444-4444-444444444444',
  'Chengdu International Medical Center',
  '成都国际医疗中心',
  '成都国際医療センター',
  '청두 국제 의료 센터',
  'Western China''s premier international medical facility with comprehensive healthcare services.',
  '中国西部首屈一指的国际医疗机构，提供全面的医疗服务。',
  '中国西部でトップクラスの国際医療施設で、総合的な医療サービスを提供しています。',
  '중국 서부 최고의 국제 의료 시설로 종합적인 의료 서비스를 제공합니다.',
  '{"street": "88 Renmin South Road", "district": "Wuhou District", "city": "Chengdu", "province": "Sichuan", "country": "China", "postal_code": "610041"}',
  ST_GeogFromText('POINT(104.0665 30.5728)'),
  '+86-28-8558-8888',
  'contact@cdimc.com',
  'https://www.cdimc.com',
  4.5,
  723,
  '{"Gastroenterology", "Endocrinology", "Rheumatology", "Psychiatry", "Rehabilitation", "Traditional Chinese Medicine"}',
  '{"en", "zh", "ja", "ko"}',
  true,
  '{"monday": "08:30-19:00", "tuesday": "08:30-19:00", "wednesday": "08:30-19:00", "thursday": "08:30-19:00", "friday": "08:30-19:00", "saturday": "09:00-17:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 5. Shenzhen International Medical Center
(
  '55555555-5555-5555-5555-555555555555',
  'Shenzhen International Medical Center',
  '深圳国际医疗中心',
  '深セン国際医療センター',
  '선전 국제 의료 센터',
  'Modern medical facility in Shenzhen with advanced technology and international medical standards.',
  '深圳现代化医疗机构，拥有先进技术和国际医疗标准。',
  '深センの近代的な医療施設で、先進技術と国際医療基準を備えています。',
  '선전의 현대적인 의료 시설로 첨단 기술과 국제 의료 기준을 갖추고 있습니다.',
  '{"street": "2001 Shennan Road", "district": "Futian District", "city": "Shenzhen", "province": "Guangdong", "country": "China", "postal_code": "518048"}',
  ST_GeogFromText('POINT(114.0579 22.5431)'),
  '+86-755-3333-8888',
  'info@szimc.com',
  'https://www.szimc.com',
  4.7,
  912,
  '{"Cardiology", "Neurology", "Orthopedics", "Dentistry", "Cosmetic Surgery", "Health Checkup"}',
  '{"en", "zh", "ja", "ko", "ru"}',
  true,
  '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 6. Xi''an International Medical Center
(
  '66666666-6666-6666-6666-666666666666',
  'Xi''an International Medical Center',
  '西安国际医疗中心',
  '西安国際医療センター',
  '시안 국제 의료 센터',
  'Historical city''s modern medical center combining traditional and Western medicine.',
  '历史名城的现代化医疗中心，结合传统医学和西医。',
  '歴史的な都市の近代的な医療センターで、伝統医学と西洋医学を組み合わせています。',
  '역사적인 도시의 현대적인 의료 센터로 전통 의학과 서양 의학을 결합합니다.',
  '{"street": "1 Yanta Road", "district": "Yanta District", "city": "Xi''an", "province": "Shaanxi", "country": "China", "postal_code": "710061"}',
  ST_GeogFromText('POINT(108.9480 34.2632)'),
  '+86-29-8526-8888',
  'contact@xaimc.com',
  'https://www.xaimc.com',
  4.4,
  645,
  '{"Traditional Chinese Medicine", "Acupuncture", "Internal Medicine", "Surgery", "Pediatrics", "Geriatrics"}',
  '{"en", "zh", "ja", "ko"}',
  true,
  '{"monday": "08:30-18:00", "tuesday": "08:30-18:00", "wednesday": "08:30-18:00", "thursday": "08:30-18:00", "friday": "08:30-18:00", "saturday": "09:00-17:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 7. Hangzhou International Medical Center
(
  '77777777-7777-7777-7777-777777777777',
  'Hangzhou International Medical Center',
  '杭州国际医疗中心',
  '杭州国際医療センター',
  '항저우 국제 의료 센터',
  'Scenic city''s premium medical facility with lake-view recovery rooms.',
  '风景城市的优质医疗机构，设有湖景康复病房。',
  '風光明媚な都市の高級医療施設で、湖の景色が見える回復室があります。',
  '경치 좋은 도시의 프리미엄 의료 시설로 호수 전망의 회복실이 있습니다.',
  '{"street": "1 West Lake Road", "district": "Xihu District", "city": "Hangzhou", "province": "Zhejiang", "country": "China", "postal_code": "310007"}',
  ST_GeogFromText('POINT(120.1551 30.2741)'),
  '+86-571-8799-8888',
  'info@hzimc.com',
  'https://www.hzimc.com',
  4.8,
  1034,
  '{"Ophthalmology", "Dermatology", "Plastic Surgery", "Dentistry", "Health Screening", "Rehabilitation"}',
  '{"en", "zh", "ja", "ko", "fr"}',
  true,
  '{"monday": "08:00-19:00", "tuesday": "08:00-19:00", "wednesday": "08:00-19:00", "thursday": "08:00-19:00", "friday": "08:00-19:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 8. Nanjing International Medical Center
(
  '88888888-8888-8888-8888-888888888888',
  'Nanjing International Medical Center',
  '南京国际医疗中心',
  '南京国際医療センター',
  '난징 국제 의료 센터',
  'Capital city''s comprehensive medical center with historical medical expertise.',
  '省会城市的综合性医疗中心，拥有历史悠久的医疗专业知识。',
  '省都の総合医療センターで、歴史的な医療専門知識を持っています。',
  '성도 종합 의료 센터로 역사적인 의료 전문 지식을 보유하고 있습니다.',
  '{"street": "321 Zhongshan Road", "district": "Xuanwu District", "city": "Nanjing", "province": "Jiangsu", "country": "China", "postal_code": "210008"}',
  ST_GeogFromText('POINT(118.7969 32.0603)'),
  '+86-25-8330-8888',
  'contact@njimc.com',
  'https://www.njimc.com',
  4.5,
  789,
  '{"Cardiology", "Neurology", "Oncology", "Hematology", "Nephrology", "Traditional Chinese Medicine"}',
  '{"en", "zh", "ja", "ko"}',
  true,
  '{"monday": "08:30-19:00", "tuesday": "08:30-19:00", "wednesday": "08:30-19:00", "thursday": "08:30-19:00", "friday": "08:30-19:00", "saturday": "09:00-17:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 9. Wuhan International Medical Center
(
  '99999999-9999-9999-9999-999999999999',
  'Wuhan International Medical Center',
  '武汉国际医疗中心',
  '武漢国際医療センター',
  '우한 국제 의료 센터',
  'Central China''s leading medical research and treatment center.',
  '华中地区领先的医学研究和治疗中心。',
  '華中地域をリードする医学研究・治療センターです。',
  '화중 지역을 선도하는 의학 연구 및 치료 센터입니다.',
  '{"street": "1 Jiefang Road", "district": "Jiang''an District", "city": "Wuhan", "province": "Hubei", "country": "China", "postal_code": "430014"}',
  ST_GeogFromText('POINT(114.2986 30.5844)'),
  '+86-27-8572-8888',
  'info@whimc.com',
  'https://www.whimc.com',
  4.6,
  876,
  '{"Infectious Diseases", "Respiratory Medicine", "Immunology", "Gastroenterology", "Endocrinology", "Research Medicine"}',
  '{"en", "zh", "ja", "ko", "de"}',
  true,
  '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
),

-- 10. Tianjin International Medical Center
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Tianjin International Medical Center',
  '天津国际医疗中心',
  '天津国際医療センター',
  '톈진 국제 의료 센터',
  'Port city''s modern medical facility with international maritime health services.',
  '港口城市的现代化医疗机构，提供国际海事健康服务。',
  '港湾都市の近代的な医療施設で、国際的な海事健康サービスを提供しています。',
  '항구 도시의 현대적인 의료 시설로 국제 해상 건강 서비스를 제공합니다.',
  '{"street": "1 Binhai Road", "district": "Binhai New Area", "city": "Tianjin", "province": "Tianjin", "country": "China", "postal_code": "300457"}',
  ST_GeogFromText('POINT(117.2000 39.0842)'),
  '+86-22-6628-8888',
  'contact@tjimc.com',
  'https://www.tjimc.com',
  4.4,
  698,
  '{"Maritime Medicine", "Occupational Health", "Emergency Medicine", "Trauma Surgery", "Rehabilitation", "Health Screening"}',
  '{"en", "zh", "ja", "ko", "ru", "es"}',
  true,
  '{"monday": "08:00-20:00", "tuesday": "08:00-20:00", "wednesday": "08:00-20:00", "thursday": "08:00-20:00", "friday": "08:00-20:00", "saturday": "09:00-18:00", "sunday": "09:00-16:00"}',
  true,
  true
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hospitals_specialties ON hospitals USING GIN(specialties);
CREATE INDEX IF NOT EXISTS idx_hospitals_languages ON hospitals USING GIN(languages_supported);
CREATE INDEX IF NOT EXISTS idx_hospitals_rating ON hospitals(rating DESC);
CREATE INDEX IF NOT EXISTS idx_hospitals_city ON hospitals((address->>'city'));