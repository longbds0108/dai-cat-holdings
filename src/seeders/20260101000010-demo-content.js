'use strict';
const bcrypt = require('bcryptjs');

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
        slug: 'bcons-city-life',
        titleVi: 'Bcons City Life',
        titleEn: 'Bcons City Life',
        summaryVi: 'Khu đô thị 15ha tại Tân Uyên, Bình Dương với nhà phố và căn hộ, hạ tầng đồng bộ theo 3 giai đoạn.',
        summaryEn: 'A 15-hectare urban development in Tan Uyen, Binh Duong with townhouses and apartments across 3 phases.',
        descriptionVi:
          '<p>Bcons City Life là khu đô thị quy mô 15ha tọa lạc tại đường Tố Hữu (ĐH 412), phường Uyên Hưng, Tân Uyên, Bình Dương, do Bcons Corporation phát triển. Dự án gồm 3 giai đoạn: giai đoạn 1 là nhà phố (4,7ha, 348 căn), giai đoạn 2 kết hợp nhà phố và căn hộ nhà ở xã hội (6,6ha), giai đoạn 3 gồm nhà phố và căn hộ chung cư (3,7ha).</p><p>Diện tích lô từ 60-120m², xây dựng 1 trệt 2 lầu, sổ hồng riêng từng căn, bàn giao ngay. Tiện ích nội khu gồm đường nhựa, vỉa hè, hệ thống điện nước hoàn chỉnh, đèn đường, mảng xanh, khu vui chơi ngoài trời, đường chạy bộ và sân thể thao.</p><p>Vị trí trên trục giao thông chính, mật độ dân cư cao, gần trung tâm hành chính Tân Uyên, tiềm năng đầu tư lớn.</p>',
        descriptionEn:
          '<p>Bcons City Life is a 15-hectare urban development on Tố Hữu Street (DH 412), Uyên Hưng Ward, Tân Uyên, Bình Dương, developed by Bcons Corporation. The project spans 3 phases: phase 1 townhouses (4.7ha, 348 units), phase 2 townhouses plus social housing apartments (6.6ha), and phase 3 townhouses plus condominiums (3.7ha).</p><p>Lot sizes range from 60-120 m², built as ground floor plus 2 levels, with individual land titles and immediate handover. On-site amenities include paved roads, sidewalks, complete utilities, street lighting, green space, outdoor recreation areas, jogging tracks, and sports facilities.</p><p>Located on a major traffic artery with high population density, close to the Tân Uyên administrative center, with strong investment potential.</p>',
        type: 'khu do thi',
        location: 'Phường Uyên Hưng, TP. Tân Uyên, Bình Dương',
        status: 'selling',
        areaText: '60 - 120 m² (quy mô 15ha)',
        priceFromText: 'Từ 3,5 tỷ VNĐ/căn',
        coverImage: '/images/projects/bcons-city-life.webp',
        images: JSON.stringify(['/images/projects/bcons-city-life.webp']),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'khu-nha-o-kim-kim-tran',
        titleVi: 'Khu nhà ở Kim Kim Trần',
        titleEn: 'Kim Kim Tran Residential Area',
        summaryVi: 'Nhà phố liên kế tại Tân Hiệp, Tân Uyên, Bình Dương - đã có sổ hồng, hỗ trợ vay VP Bank, MB Bank.',
        summaryEn: 'Townhouses in Tan Hiep, Tan Uyen, Binh Duong - titles already issued, financing via VP Bank and MB Bank.',
        descriptionVi:
          '<p>Khu nhà ở Kim Kim Trần (Paragon City) do Đại Cát Holdings phân phối, tọa lạc tại đường DT 747B, phường Tân Hiệp, thị xã Tân Uyên, Bình Dương. Quy mô 2,78ha với 182 căn nhà phố liên kế giai đoạn 1, diện tích căn 50-83m² (lô 60-80m²).</p><p>Đường nội khu thiết kế theo kiểu bàn cờ, rộng rãi, thông thoáng. Cơ cấu sử dụng đất: đất ở 55,05%, giao thông 32,84%, giáo dục 4,32%, cây xanh 4,32%, hạ tầng kỹ thuật 4,7%.</p><p>Tiện ích xung quanh gồm trường học, trung tâm thương mại, công viên, camera an ninh 24/7, gần bệnh viện, ngân hàng, chợ và cơ quan hành chính. Dự án đã có sổ hồng, hỗ trợ vay vốn từ VP Bank và MB Bank.</p>',
        descriptionEn:
          '<p>Kim Kim Tran Residential Area (Paragon City), distributed by Dai Cat Holdings, is located on DT 747B Street, Tan Hiep Ward, Tan Uyen Town, Binh Duong. Spanning 2.78 hectares with 182 townhouses in phase 1, unit sizes range from 50-83 m² (lots 60-80 m²).</p><p>Interior roads are laid out in a spacious, airy grid pattern. Land-use breakdown: 55.05% residential, 32.84% traffic, 4.32% education, 4.32% green space, and 4.7% technical infrastructure.</p><p>Nearby amenities include schools, shopping centers, parks, 24/7 security cameras, and proximity to hospitals, banks, markets, and administrative offices. Titles (sổ hồng) have already been issued, with financing support from VP Bank and MB Bank.</p>',
        type: 'nha pho',
        location: 'Phường Tân Hiệp, TX. Tân Uyên, Bình Dương',
        status: 'selling',
        areaText: '50 - 83 m² (lô 60 - 80 m²)',
        priceFromText: '2,1 tỷ VNĐ/căn',
        coverImage: '/images/projects/khu-nha-o-kim-kim-tran.webp',
        images: JSON.stringify(['/images/projects/khu-nha-o-kim-kim-tran.webp']),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'thang-long-house',
        titleVi: 'Thăng Long House',
        titleEn: 'Thang Long House',
        summaryVi: 'Nhà phố, đất nền tại Tân Hiệp, Tân Uyên - sổ sẵn, sang tên công chứng ngay, gần VSIP II, VSIP III.',
        summaryEn: 'Townhouses and land plots in Tan Hiep, Tan Uyen - titles ready for immediate transfer, near VSIP II and VSIP III.',
        descriptionVi:
          '<p>Khu nhà ở Thăng Long House tọa lạc tại phường Tân Hiệp, TP. Tân Uyên, tỉnh Bình Dương, do Công ty Cổ phần Bất động sản Cona Land phát triển. Quy mô 3,03ha với 186 sản phẩm, giai đoạn 2 gồm 68 căn nhà phố (1 trệt 2 lầu), diện tích 61,9-153,3m².</p><p>Pháp lý: sổ sẵn, sang tên công chứng ngay. Hạ tầng điện âm, hệ thống thoát nước mưa và nước thải tách riêng, đường rộng 13-18m. Tiện ích gồm công viên cây xanh lớn, trường học nội khu hiện đại.</p><p>Vị trí trung tâm giữa các khu công nghiệp lớn: cách VSIP III, VSIP II khoảng 5 phút, cách AEON Mall khoảng 15 phút - thuận tiện cho chuyên gia và người lao động khu công nghiệp.</p>',
        descriptionEn:
          '<p>Thang Long House residential area is located in Tan Hiep Ward, Tan Uyen City, Binh Duong, developed by Cona Land Real Estate JSC. Spanning 3.03 hectares with 186 units, phase 2 includes 68 townhouses (ground floor plus 2 levels), sized 61.9-153.3 m².</p><p>Legal status: titles ready, immediate notarized transfer. Infrastructure includes underground electrical systems, separated stormwater/wastewater systems, and roads 13-18m wide. Amenities include a large green park and a modern on-site school.</p><p>Centrally located among major industrial zones: about 5 minutes from VSIP III and VSIP II, and 15 minutes from AEON Mall - convenient for professionals and industrial park workers.</p>',
        type: 'nha pho',
        location: 'Phường Tân Hiệp, TP. Tân Uyên, Bình Dương',
        status: 'selling',
        areaText: '61,9 - 153,3 m²',
        priceFromText: 'Từ 1,5 tỷ VNĐ/nền',
        coverImage: '/images/projects/thang-long-house.webp',
        images: JSON.stringify(['/images/projects/thang-long-house.webp']),
        isFeatured: true,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'khu-nha-o-huong-duong',
        titleVi: 'Khu nhà ở Hướng Dương',
        titleEn: 'Huong Duong Residential Area',
        summaryVi: 'Nhà phố liền kề tại Tân Hiệp, gần VSIP III, AEON Mall và nhà máy LEGO Việt Nam.',
        summaryEn: 'Adjoining townhouses in Tan Hiep, near VSIP III, AEON Mall, and the LEGO Vietnam factory.',
        descriptionVi:
          '<p>Khu nhà ở Hướng Dương tọa lạc tại phường Tân Hiệp (TP.HCM, trước đây là Tân Uyên, Bình Dương), do Công ty Cổ phần Đầu tư Bất động sản Hướng Dương phát triển. Quy mô 150 căn nhà phố liền kề trên 2,2ha (giai đoạn 1-2), diện tích 58-121,77m², xây 1 trệt 1 lầu hoặc 1 trệt 2 lầu.</p><p>Pháp lý: đã có quy hoạch 1/500, giấy phép xây dựng, hồ sơ thiết kế được duyệt. Tiện ích nội khu: trường mầm non, công viên chủ đề Aura Park, siêu thị mini, trung tâm Anh ngữ, phòng gym, sân Pickleball, khu vui chơi trẻ em, đường dạo sinh thái.</p><p>Tiện ích ngoại khu: khu công nghiệp VSIP III, cơ sở y tế, trường học, AEON Mall, nhà máy LEGO Việt Nam. Đường nội khu rộng 10,5-13m, hệ thống điện âm, cấp nước và chiếu sáng ngầm.</p>',
        descriptionEn:
          '<p>Huong Duong Residential Area is located in Tan Hiep Ward (Ho Chi Minh City, formerly Tan Uyen, Binh Duong), developed by Huong Duong Real Estate Investment JSC. It comprises 150 adjoining townhouses across 2.2 hectares (phases 1-2), sized 58-121.77 m², built as ground floor plus 1 or 2 levels.</p><p>Legal status: 1/500 planning approved, construction permit issued, design documentation approved. On-site amenities: kindergarten, Aura Park themed park, mini-mart, English center, gym, pickleball court, children\'s playground, and eco walking paths.</p><p>Nearby: VSIP III industrial zone, medical facilities, schools, AEON Mall, and the LEGO Vietnam factory. Interior roads are 10.5-13m wide with underground electrical, water supply, and lighting systems.</p>',
        type: 'nha pho',
        location: 'Phường Tân Hiệp, TP. Hồ Chí Minh',
        status: 'selling',
        areaText: '58 - 121,77 m²',
        priceFromText: 'Từ 1,9 tỷ VNĐ/căn',
        coverImage: '/images/projects/khu-nha-o-huong-duong.webp',
        images: JSON.stringify(['/images/projects/khu-nha-o-huong-duong.webp']),
        isFeatured: false,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'duong-tien-phat',
        titleVi: 'Dự án Dương Tiến Phát',
        titleEn: 'Duong Tien Phat Project',
        summaryVi: 'Đất nền dự án tại Hội Nghĩa, Tân Uyên - sổ hồng riêng từng nền, xây dựng tự do.',
        summaryEn: 'Land plots in Hoi Nghia, Tan Uyen - individual land titles, free to build to your needs.',
        descriptionVi:
          '<p>Dự án Dương Tiến Phát tọa lạc tại phường Hội Nghĩa, thị xã Tân Uyên, tỉnh Bình Dương, do Công ty TNHH Thương mại Bất động sản Dương Tiến Phát phát triển. Tổng diện tích 40.937,8m² (4,1ha) với 225 nền đất và nhà, diện tích sản phẩm 70-170m².</p><p>Pháp lý: sổ hồng riêng từng nền, đã có sổ, xây dựng tự do theo nhu cầu. Tiện ích nội khu gồm công viên cây xanh, khu vui chơi trẻ em, khu cảnh quan và đường đi bộ, hệ thống an ninh 24/7. Hạ tầng đường nội khu rộng 13-15m, hệ thống điện âm, nước mưa và nước thải riêng biệt.</p>',
        descriptionEn:
          '<p>Duong Tien Phat project is located in Hoi Nghia Ward, Tan Uyen Town, Binh Duong, developed by Duong Tien Phat Real Estate Trading Co., Ltd. Total area of 40,937.8 m² (4.1 ha) with 225 land plots and houses, unit sizes ranging from 70-170 m².</p><p>Legal status: individual land titles already issued, free to build according to your needs. On-site amenities include a green park, children\'s playground, landscaped walking paths, and 24/7 security. Infrastructure includes 13-15m wide interior roads with separated underground electrical, stormwater, and wastewater systems.</p>',
        type: 'dat nen',
        location: 'Phường Hội Nghĩa, TX. Tân Uyên, Bình Dương',
        status: 'selling',
        areaText: '70 - 170 m²',
        priceFromText: 'Từ 1,5 tỷ VNĐ/nền',
        coverImage: '/images/projects/duong-tien-phat.webp',
        images: JSON.stringify(['/images/projects/duong-tien-phat.webp']),
        isFeatured: false,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('NewsPosts', [
      {
        slug: 'huong-duong-tan-uyen-diem-sang-dau-tu',
        titleVi: 'Dự Án Hướng Dương Tân Uyên – Điểm Sáng Đầu Tư Bất Động Sản Sau Sáp Nhập',
        titleEn: 'Huong Duong Tan Uyen – A Bright Spot for Real Estate Investment After the Merger',
        excerptVi: 'Bất động sản Tân Uyên bước vào chu kỳ tăng trưởng mới sau khi Bình Dương sáp nhập vào TP.HCM mở rộng.',
        excerptEn: 'Tan Uyen real estate enters a new growth cycle after Binh Duong merged into expanded Ho Chi Minh City.',
        contentVi:
          '<p>Bất động sản Tân Uyên bước vào chu kỳ tăng trưởng mới sau khi Bình Dương sáp nhập vào TP.HCM mở rộng. Dự án Hướng Dương Tân Uyên nằm tại trung tâm phát triển mới của khu vực, gần VSIP 3, các khu công nghiệp lớn và hạ tầng giao thông quan trọng như Vành đai 3, Vành đai 4.</p><p><strong>Vì sao thu hút đầu tư:</strong> giá vẫn ở giai đoạn đầu, rẻ hơn so với Thủ Đức; nhu cầu nhà ở lớn từ lao động khu công nghiệp; hạ tầng hoàn thiện liên tục; quỹ đất trung tâm ngày càng khan hiếm.</p><p>Nhà phố tại đây còn phù hợp kinh doanh cửa hàng tiện lợi, quán cà phê, nhà hàng, spa và dịch vụ cho chuyên gia thuê. Giai đoạn 2026-2030 được dự báo tăng trưởng tích cực nhờ phát triển hạ tầng và dòng vốn FDI.</p>',
        contentEn:
          '<p>Tan Uyen real estate is entering a new growth cycle after Binh Duong merged into expanded Ho Chi Minh City. The Huong Duong Tan Uyen project sits at the heart of the area\'s new development zone, close to VSIP 3, major industrial parks, and key transport infrastructure such as Ring Roads 3 and 4.</p><p><strong>Why it attracts investors:</strong> pricing is still at an early stage, more affordable than Thu Duc; strong housing demand from industrial park workers; continuously improving infrastructure; and increasingly scarce central land supply.</p><p>Townhouses here are also well suited for convenience stores, cafes, restaurants, spas, and rentals for professionals. The 2026-2030 period is forecast to see positive growth driven by infrastructure development and FDI inflows.</p>',
        coverImage: '/images/projects/khu-nha-o-huong-duong.webp',
        isPublished: true,
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'thang-long-house-vanh-dai-4-vsip-iii',
        titleVi: 'Thăng Long House Đón Sóng Đầu Tư Từ Vành Đai 4 Và VSIP III',
        titleEn: 'Thang Long House Welcomes an Investment Wave from Ring Road 4 and VSIP III',
        excerptVi: 'Hạ tầng Vành đai 4 và các khu công nghiệp VSIP mang lại lợi thế lớn cho dự án Thăng Long House.',
        excerptEn: 'Ring Road 4 and the VSIP industrial parks bring major advantages to the Thang Long House project.',
        contentVi:
          '<p>Vành đai 4 TP.HCM dài khoảng 207km đi qua 5 tỉnh thành, dự kiến trình Quốc hội đầu năm 2025 và khởi công năm 2026. Đoạn qua Bình Dương dài 48km kết nối các khu công nghiệp lớn gồm VSIP III và VSIP II.</p><p>Thăng Long House nằm ở vị trí trung tâm giữa 4 khu công nghiệp lớn nhưng vẫn giữ khoảng cách với tiếng ồn công nghiệp. Dự án do Cona Land phát triển tại phường Tân Hiệp, phù hợp cho khách hàng tìm kiếm mức giá gốc trong bối cảnh hạ tầng đang hoàn thiện.</p><p>Giới chuyên gia dự báo giá bất động sản khu vực gần Vành đai 4 sẽ tăng trưởng khi hạ tầng giao thông hoàn thiện và tính kết nối vùng được cải thiện, khiến các dự án giai đoạn đầu trở nên hấp dẫn với nhà đầu tư.</p>',
        contentEn:
          '<p>Ho Chi Minh City\'s Ring Road 4 spans roughly 207km across 5 provinces, expected to be presented to the National Assembly in early 2025 with construction starting in 2026. The 48km Binh Duong section connects major industrial parks including VSIP III and VSIP II.</p><p>Thang Long House sits centrally among 4 major industrial zones while maintaining distance from industrial noise. Developed by Cona Land in Tan Hiep Ward, the project suits buyers looking for original pricing while infrastructure is still being completed.</p><p>Experts forecast that property values near Ring Road 4 will grow as transport infrastructure is completed and regional connectivity improves, making early-phase projects particularly attractive to investors.</p>',
        coverImage: '/images/projects/thang-long-house.webp',
        isPublished: true,
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('SiteSettings', [
      { key: 'company_phone', value: '0936581147', createdAt: now, updatedAt: now },
      { key: 'company_phone_2', value: '0931255512', createdAt: now, updatedAt: now },
      { key: 'company_email', value: 'daicatholdings@gmail.com', createdAt: now, updatedAt: now },
      { key: 'company_address', value: '27 đường 36, Khu đô thị Vạn Phúc, P. Hiệp Bình, TP. Hồ Chí Minh', createdAt: now, updatedAt: now },
      { key: 'social_facebook', value: 'https://www.facebook.com/daicatholdings', createdAt: now, updatedAt: now },
      { key: 'social_zalo', value: 'https://zalo.me/0936581147', createdAt: now, updatedAt: now },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('SiteSettings', null, {});
    await queryInterface.bulkDelete('NewsPosts', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('AdminUsers', null, {});
  },
};
