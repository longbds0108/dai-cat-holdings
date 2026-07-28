'use strict';
const bcrypt = require('bcryptjs');

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'change-this-password', 10);
    await queryInterface.bulkInsert('AdminUsers', [
      {
        name: 'Quản trị viên',
        email: process.env.ADMIN_EMAIL || 'admin@daicatholdings.vn',
        passwordHash,
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('Projects', [
      {
        slug: 'dai-cat-riverside',
        titleVi: 'Đại Cát Riverside',
        titleEn: 'Dai Cat Riverside',
        summaryVi: 'Khu căn hộ cao cấp ven sông với tầm nhìn toàn cảnh thành phố.',
        summaryEn: 'A premium riverside apartment complex with panoramic city views.',
        descriptionVi:
          'Đại Cát Riverside tọa lạc tại vị trí đắc địa ven sông, sở hữu thiết kế kiến trúc hiện đại kết hợp không gian xanh, mang đến trải nghiệm sống đẳng cấp cho cư dân.',
        descriptionEn:
          'Dai Cat Riverside sits on a prime riverfront location, featuring modern architecture combined with lush green spaces for a premium living experience.',
        type: 'apartment',
        location: 'Quận 2, TP. Hồ Chí Minh',
        status: 'selling',
        areaText: '45 - 120 m²',
        priceFromText: 'Từ 3.2 tỷ VNĐ',
        coverImage: img(323780),
        images: JSON.stringify([img(323780), img(1918291), img(1571460)]),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'dai-cat-hillside-villas',
        titleVi: 'Đại Cát Hillside Villas',
        titleEn: 'Dai Cat Hillside Villas',
        summaryVi: 'Quần thể biệt thự nghỉ dưỡng trên đồi, hòa mình cùng thiên nhiên.',
        summaryEn: 'A hillside resort villa community immersed in nature.',
        descriptionVi:
          'Với quy hoạch thấp tầng, mật độ xây dựng thấp, Đại Cát Hillside Villas mang đến không gian sống riêng tư, trong lành cho những gia đình yêu thích sự tĩnh lặng.',
        descriptionEn:
          'With a low-rise, low-density master plan, Dai Cat Hillside Villas offers a private, fresh-air living space for families who cherish tranquility.',
        type: 'villa',
        location: 'Bảo Lộc, Lâm Đồng',
        status: 'upcoming',
        areaText: '250 - 500 m²',
        priceFromText: 'Từ 8.5 tỷ VNĐ',
        coverImage: img(280222),
        images: JSON.stringify([img(280222), img(2098405), img(439227)]),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'dai-cat-business-tower',
        titleVi: 'Đại Cát Business Tower',
        titleEn: 'Dai Cat Business Tower',
        summaryVi: 'Tòa nhà văn phòng hạng A tại trung tâm thành phố.',
        summaryEn: 'A grade-A office tower in the heart of the city.',
        descriptionVi:
          'Đại Cát Business Tower là biểu tượng kiến trúc mới, cung cấp không gian văn phòng hạng A đạt chuẩn quốc tế cho các doanh nghiệp trong và ngoài nước.',
        descriptionEn:
          'Dai Cat Business Tower is a new architectural landmark, offering internationally-standard grade-A office space for domestic and foreign enterprises.',
        type: 'commercial',
        location: 'Quận 1, TP. Hồ Chí Minh',
        status: 'completed',
        areaText: '100 - 2,000 m²',
        priceFromText: 'Liên hệ',
        coverImage: img(1546168),
        images: JSON.stringify([img(1546168), img(271816), img(1396122)]),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('NewsPosts', [
      {
        slug: 'dai-cat-holdings-ra-mat-thuong-hieu-moi',
        titleVi: 'Đại Cát Holdings chính thức ra mắt bộ nhận diện thương hiệu mới',
        titleEn: 'Dai Cat Holdings Unveils New Brand Identity',
        excerptVi: 'Đánh dấu bước chuyển mình mạnh mẽ trong hành trình phát triển bền vững.',
        excerptEn: 'Marking a bold new step in our journey toward sustainable growth.',
        contentVi:
          '<p>Ngày hôm nay, Đại Cát Holdings chính thức công bố bộ nhận diện thương hiệu mới, thể hiện khát vọng vươn tầm khu vực trong lĩnh vực phát triển bất động sản cao cấp.</p>',
        contentEn:
          '<p>Today, Dai Cat Holdings officially unveiled its new brand identity, reflecting its ambition to become a leading regional premium real estate developer.</p>',
        coverImage: img(1918291),
        isPublished: true,
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'khoi-cong-du-an-dai-cat-riverside',
        titleVi: 'Khởi công dự án Đại Cát Riverside',
        titleEn: 'Groundbreaking Ceremony for Dai Cat Riverside',
        excerptVi: 'Dự án dự kiến bàn giao vào quý IV năm sau.',
        excerptEn: 'The project is expected to be handed over in Q4 next year.',
        contentVi:
          '<p>Lễ khởi công dự án Đại Cát Riverside đã diễn ra thành công, đánh dấu cột mốc quan trọng trong chiến lược phát triển của Đại Cát Holdings.</p>',
        contentEn:
          '<p>The groundbreaking ceremony for Dai Cat Riverside was successfully held, marking an important milestone in Dai Cat Holdings\' development strategy.</p>',
        coverImage: img(2098405),
        isPublished: true,
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('SiteSettings', [
      { key: 'company_phone', value: '+84 28 1234 5678', createdAt: now, updatedAt: now },
      { key: 'company_email', value: 'contact@daicatholdings.vn', createdAt: now, updatedAt: now },
      { key: 'company_address', value: 'Tầng 20, Tòa nhà Đại Cát, Quận 1, TP. Hồ Chí Minh', createdAt: now, updatedAt: now },
      { key: 'social_facebook', value: '', createdAt: now, updatedAt: now },
      { key: 'social_linkedin', value: '', createdAt: now, updatedAt: now },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('SiteSettings', null, {});
    await queryInterface.bulkDelete('NewsPosts', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('AdminUsers', null, {});
  },
};
