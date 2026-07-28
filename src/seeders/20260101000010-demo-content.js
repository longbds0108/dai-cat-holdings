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
        slug: 'du-an-huong-duong-tan-uyen-diem-sang-dau-tu-bat-dong-san',
        titleVi: 'Dự Án Hướng Dương Tân Uyên – Điểm Sáng Đầu Tư Bất Động Sản TP.HCM Mở Rộng Sau Sáp Nhập',
        titleEn: 'Huong Duong Tan Uyen Project – A Bright Spot for Real Estate Investment in Expanded Ho Chi Minh City After the Merger',
        excerptVi: 'Bất động sản Tân Uyên bước vào chu kỳ tăng trưởng mới sau khi Bình Dương chính thức trở thành một phần của TP.HCM mở rộng.',
        excerptEn: 'Tan Uyen real estate enters a new growth cycle after Binh Duong officially became part of expanded Ho Chi Minh City.',
        contentVi:
          '<h2>Bất động sản Tân Uyên bước vào chu kỳ tăng trưởng mới</h2>' +
          '<p>Sau khi Bình Dương chính thức trở thành một phần của TP.HCM mở rộng, thị trường bất động sản khu vực phía Đông Bắc đang chứng kiến sự thay đổi mạnh mẽ về quy hoạch, hạ tầng và dòng vốn đầu tư. Trong đó, Tân Uyên nổi lên là một trong những địa phương được hưởng lợi nhiều nhất nhờ vị trí chiến lược, tốc độ đô thị hóa cao và hệ thống khu công nghiệp phát triển hàng đầu cả nước.</p>' +
          '<p>Giữa làn sóng dịch chuyển dân cư và doanh nghiệp về các đô thị vệ tinh, dự án Hướng Dương Tân Uyên đang trở thành tâm điểm quan tâm của giới đầu tư nhờ mức giá hợp lý, pháp lý rõ ràng và tiềm năng tăng giá vượt trội trong giai đoạn 2026 – 2030.</p>' +
          '<h2>Tân Uyên – Trung tâm công nghiệp mới của TP.HCM mở rộng</h2>' +
          '<p>Trong nhiều năm qua, Tân Uyên luôn nằm trong nhóm địa phương có tốc độ phát triển kinh tế nhanh nhất khu vực Đông Nam Bộ. Sự hiện diện của hàng loạt khu công nghiệp lớn như VSIP 3, Nam Tân Uyên, Nam Tân Uyên Mở Rộng, KCN Tân Bình cùng hàng nghìn doanh nghiệp trong và ngoài nước đã tạo nên nền tảng kinh tế vững chắc cho địa phương.</p>' +
          '<p>Không chỉ là trung tâm sản xuất công nghiệp, Tân Uyên còn đang chuyển mình mạnh mẽ sang mô hình đô thị hiện đại với hệ thống trung tâm thương mại, trường học, bệnh viện và các khu dân cư quy hoạch bài bản.</p>' +
          '<p>Việc sáp nhập vào TP.HCM càng tạo thêm động lực cho quá trình phát triển khi các nguồn lực đầu tư hạ tầng được ưu tiên đẩy mạnh nhằm kết nối đồng bộ toàn vùng.</p>' +
          '<h2>Hạ tầng giao thông tạo đòn bẩy cho bất động sản Tân Uyên</h2>' +
          '<p>Một trong những yếu tố quan trọng giúp giá trị bất động sản Tân Uyên gia tăng nhanh chóng chính là hệ thống hạ tầng giao thông ngày càng hoàn thiện.</p>' +
          '<h3>Vành đai 3 TP.HCM</h3>' +
          '<p>Đây là tuyến giao thông chiến lược kết nối TP.HCM với Bình Dương, Đồng Nai và Long An. Khi hoàn thành, thời gian di chuyển từ Tân Uyên đến trung tâm TP.HCM sẽ được rút ngắn đáng kể.</p>' +
          '<h3>Vành đai 4</h3>' +
          '<p>Tuyến đường này đóng vai trò kết nối các khu công nghiệp và trung tâm logistics lớn nhất phía Nam, tạo điều kiện thuận lợi cho hoạt động sản xuất và thương mại.</p>' +
          '<h3>Mỹ Phước – Tân Vạn</h3>' +
          '<p>Được xem là "xương sống giao thông" của Bình Dương trước đây, tuyến đường này giúp kết nối nhanh chóng từ Tân Uyên đến TP. Thủ Đức, cảng Cát Lái và sân bay Long Thành.</p>' +
          '<h3>ĐT746 – ĐT747</h3>' +
          '<p>Hai tuyến đường huyết mạch đang được mở rộng nhằm đáp ứng nhu cầu giao thương và phát triển đô thị trong tương lai.</p>' +
          '<p>Chính sự đồng bộ của hệ thống hạ tầng đã giúp bất động sản Tân Uyên trở thành lựa chọn hấp dẫn đối với cả nhà đầu tư lẫn người mua ở thực.</p>' +
          '<h2>Dự án Hướng Dương Tân Uyên sở hữu vị trí chiến lược</h2>' +
          '<p>Nằm ngay khu vực trung tâm phát triển mới của Tân Uyên, dự án Hướng Dương được hưởng lợi trực tiếp từ tốc độ đô thị hóa và sự phát triển mạnh mẽ của các khu công nghiệp lân cận.</p>' +
          '<p>Từ dự án, cư dân có thể dễ dàng kết nối đến:</p>' +
          '<ul><li>VSIP 3 chỉ vài phút di chuyển.</li><li>Trung tâm hành chính Tân Uyên.</li><li>Chợ, trường học, bệnh viện hiện hữu.</li><li>Các tuyến giao thông huyết mạch liên vùng.</li><li>Khu công nghiệp Nam Tân Uyên.</li><li>Thành phố mới Bình Dương.</li><li>TP. Thủ Đức.</li></ul>' +
          '<p>Vị trí thuận lợi giúp dự án vừa đáp ứng nhu cầu an cư, vừa tạo tiềm năng khai thác kinh doanh và cho thuê hiệu quả.</p>' +
          '<h2>Vì sao dự án Hướng Dương Tân Uyên thu hút nhà đầu tư?</h2>' +
          '<h3>1. Giá trị đầu tư còn ở giai đoạn đầu</h3>' +
          '<p>So với nhiều khu vực đã phát triển như Thủ Đức hoặc Dĩ An, mặt bằng giá bất động sản tại Tân Uyên vẫn đang ở mức dễ tiếp cận hơn rất nhiều.</p>' +
          '<p>Điều này mang đến cơ hội sở hữu bất động sản với số vốn vừa phải nhưng vẫn có khả năng tăng giá cao trong tương lai.</p>' +
          '<h3>2. Nhu cầu nhà ở thực rất lớn</h3>' +
          '<p>Hàng trăm nghìn lao động và chuyên gia đang làm việc tại các khu công nghiệp tạo ra nhu cầu lớn về nhà ở.</p>' +
          '<p>Khác với nhiều thị trường mang tính đầu cơ, bất động sản Tân Uyên được hỗ trợ bởi nhu cầu ở thực, giúp duy trì tính thanh khoản ổn định.</p>' +
          '<h3>3. Hạ tầng hoàn thiện từng ngày</h3>' +
          '<p>Mỗi dự án giao thông được triển khai đều góp phần gia tăng giá trị bất động sản khu vực. Đây là động lực tăng giá bền vững trong dài hạn.</p>' +
          '<h3>4. Quỹ đất trung tâm ngày càng khan hiếm</h3>' +
          '<p>Khi tốc độ đô thị hóa tăng cao, nguồn cung đất nền và nhà phố tại các vị trí đẹp sẽ ngày càng hạn chế. Những sản phẩm được sở hữu sớm thường có lợi thế lớn về biên độ tăng giá.</p>' +
          '<h2>Tiềm năng khai thác kinh doanh tại dự án Hướng Dương</h2>' +
          '<p>Không chỉ phù hợp để ở, nhà phố tại dự án Hướng Dương còn mang lại nhiều cơ hội kinh doanh hấp dẫn.</p>' +
          '<p>Các ngành nghề có tiềm năng phát triển bao gồm:</p>' +
          '<ul><li>Cửa hàng tiện lợi.</li><li>Quán cà phê.</li><li>Nhà hàng.</li><li>Văn phòng đại diện.</li><li>Spa và làm đẹp.</li><li>Nhà thuốc.</li><li>Dịch vụ cho chuyên gia thuê.</li></ul>' +
          '<p>Nhờ mật độ dân cư ngày càng gia tăng, nhu cầu sử dụng dịch vụ thương mại sẽ tăng mạnh trong những năm tới.</p>' +
          '<h2>Nhà đầu tư đang dịch chuyển về Tân Uyên</h2>' +
          '<p>Thị trường bất động sản phía Nam đang chứng kiến xu hướng dịch chuyển dòng tiền từ các khu vực giá cao sang những thị trường còn nhiều dư địa tăng trưởng.</p>' +
          '<p>Tân Uyên hiện hội tụ đầy đủ các yếu tố từng giúp Thủ Đức bứt phá mạnh mẽ trước đây:</p>' +
          '<ul><li>Hạ tầng giao thông phát triển.</li><li>Khu công nghiệp quy mô lớn.</li><li>Dân số tăng nhanh.</li><li>Quỹ đất còn rộng.</li><li>Chính sách quy hoạch rõ ràng.</li></ul>' +
          '<p>Đây là lý do ngày càng nhiều nhà đầu tư lựa chọn Tân Uyên như một điểm đến chiến lược trong danh mục đầu tư dài hạn.</p>' +
          '<h2>Dự báo giá bất động sản Tân Uyên giai đoạn 2026 – 2030</h2>' +
          '<p>Theo đánh giá của nhiều chuyên gia thị trường, bất động sản Tân Uyên đang bước vào chu kỳ tăng trưởng mới nhờ tác động từ:</p>' +
          '<ul><li>Quá trình mở rộng TP.HCM.</li><li>Sự phát triển của VSIP 3.</li><li>Hệ thống vành đai hoàn thiện.</li><li>Sự gia tăng dân số cơ học.</li><li>Dòng vốn FDI liên tục đổ vào khu vực.</li></ul>' +
          '<p>Trong giai đoạn 2026 – 2030, những dự án sở hữu vị trí đẹp, pháp lý minh bạch và hạ tầng đồng bộ được kỳ vọng sẽ có mức tăng trưởng tích cực hơn mặt bằng chung của thị trường.</p>' +
          '<h2>Những ai nên đầu tư dự án Hướng Dương Tân Uyên?</h2>' +
          '<h3>Nhà đầu tư dài hạn</h3>' +
          '<p>Những người muốn đón đầu sự phát triển của TP.HCM mở rộng và tìm kiếm tài sản có khả năng gia tăng giá trị theo thời gian.</p>' +
          '<h3>Người mua ở thực</h3>' +
          '<p>Các gia đình trẻ đang tìm kiếm môi trường sống hiện đại, đầy đủ tiện ích với mức giá hợp lý.</p>' +
          '<h3>Nhà đầu tư cho thuê</h3>' +
          '<p>Khai thác nhu cầu thuê nhà của chuyên gia, kỹ sư và người lao động tại các khu công nghiệp lân cận.</p>' +
          '<h3>Nhà đầu tư kinh doanh</h3>' +
          '<p>Tận dụng lợi thế nhà phố thương mại để mở cửa hàng hoặc cho thuê mặt bằng.</p>' +
          '<p>Trong bối cảnh thị trường bất động sản đang bước sang chu kỳ mới, Tân Uyên nổi lên như một trong những khu vực giàu tiềm năng nhất tại TP.HCM mở rộng. Với lợi thế về vị trí, hạ tầng, công nghiệp và tốc độ đô thị hóa, khu vực này đang thu hút sự quan tâm mạnh mẽ của giới đầu tư trên cả nước.</p>' +
          '<p>Dự án Hướng Dương Tân Uyên không chỉ mang đến cơ hội an cư lý tưởng mà còn là tài sản đầu tư giá trị trong dài hạn. Việc sở hữu bất động sản tại thời điểm hiện nay được xem là bước đi chiến lược nhằm đón đầu làn sóng tăng trưởng mới của thị trường bất động sản phía Đông TP.HCM.</p>' +
          '<p>Liên hệ ngay để cập nhật bảng giá mới nhất, chính sách ưu đãi và lựa chọn vị trí đẹp nhất tại dự án Hướng Dương Tân Uyên.</p>',
        contentEn:
          '<h2>Tan Uyen Real Estate Enters a New Growth Cycle</h2>' +
          '<p>After Binh Duong officially became part of expanded Ho Chi Minh City, the real estate market in the northeastern region is seeing major shifts in planning, infrastructure, and investment capital flows. Tan Uyen in particular is emerging as one of the localities that benefits the most, thanks to its strategic location, high rate of urbanization, and a system of leading industrial parks nationwide.</p>' +
          '<p>Amid the wave of residents and businesses relocating to satellite urban areas, the Huong Duong Tan Uyen project is becoming a focal point for investors thanks to reasonable pricing, clear legal status, and outstanding price-growth potential in the 2026–2030 period.</p>' +
          '<h2>Tan Uyen – The New Industrial Center of Expanded Ho Chi Minh City</h2>' +
          '<p>For many years, Tan Uyen has consistently ranked among the fastest-growing localities economically in the Southeast region. The presence of numerous large industrial parks such as VSIP 3, Nam Tan Uyen, Nam Tan Uyen Expansion, and Tan Binh Industrial Park, together with thousands of domestic and foreign enterprises, has built a solid economic foundation for the area.</p>' +
          '<p>Beyond being an industrial production hub, Tan Uyen is also transforming strongly into a modern urban model with shopping centers, schools, hospitals, and well-planned residential areas.</p>' +
          '<p>The merger into Ho Chi Minh City adds further momentum to this development, as infrastructure investment resources are being prioritized to synchronously connect the whole region.</p>' +
          '<h2>Transport Infrastructure as a Lever for Tan Uyen Real Estate</h2>' +
          '<p>One of the key factors driving the rapid increase in Tan Uyen real estate values is its increasingly complete transport infrastructure system.</p>' +
          '<h3>Ho Chi Minh City Ring Road 3</h3>' +
          '<p>This is a strategic route connecting Ho Chi Minh City with Binh Duong, Dong Nai, and Long An. Once completed, travel time from Tan Uyen to central Ho Chi Minh City will be significantly shortened.</p>' +
          '<h3>Ring Road 4</h3>' +
          '<p>This route connects major industrial parks and the largest logistics centers in the South, facilitating production and trade activities.</p>' +
          '<h3>My Phuoc – Tan Van</h3>' +
          '<p>Once regarded as the "transport backbone" of Binh Duong, this route provides a fast connection from Tan Uyen to Thu Duc City, Cat Lai port, and Long Thanh airport.</p>' +
          '<h3>DT746 – DT747</h3>' +
          '<p>These two arterial roads are being widened to meet future trade and urban development needs.</p>' +
          '<p>This synchronized infrastructure system is precisely what makes Tan Uyen real estate an attractive choice for both investors and genuine homebuyers.</p>' +
          '<h2>Huong Duong Tan Uyen Holds a Strategic Location</h2>' +
          '<p>Sitting right in Tan Uyen\'s new development center, the Huong Duong project benefits directly from the rapid urbanization and strong growth of nearby industrial parks.</p>' +
          '<p>From the project, residents can easily connect to:</p>' +
          '<ul><li>VSIP 3, just minutes away.</li><li>Tan Uyen\'s administrative center.</li><li>Existing markets, schools, and hospitals.</li><li>Major inter-regional transport routes.</li><li>Nam Tan Uyen Industrial Park.</li><li>New Binh Duong City.</li><li>Thu Duc City.</li></ul>' +
          '<p>This favorable location lets the project serve residential needs while also creating strong potential for business and rental operations.</p>' +
          '<h2>Why Does Huong Duong Tan Uyen Attract Investors?</h2>' +
          '<h3>1. Investment Value Still at an Early Stage</h3>' +
          '<p>Compared to already-developed areas such as Thu Duc or Di An, real estate price levels in Tan Uyen remain far more accessible.</p>' +
          '<p>This offers the opportunity to own property with a moderate amount of capital while still holding strong potential for future price appreciation.</p>' +
          '<h3>2. Very Strong Genuine Housing Demand</h3>' +
          '<p>Hundreds of thousands of workers and professionals employed at the industrial parks create enormous housing demand.</p>' +
          '<p>Unlike many speculation-driven markets, Tan Uyen real estate is supported by genuine housing demand, helping maintain stable liquidity.</p>' +
          '<h3>3. Infrastructure Improving Every Day</h3>' +
          '<p>Every transport project that gets implemented contributes to raising the area\'s real estate value. This is a sustainable long-term driver of price growth.</p>' +
          '<h3>4. Increasingly Scarce Central Land Supply</h3>' +
          '<p>As urbanization accelerates, the supply of land plots and townhouses in prime locations will become increasingly limited. Products acquired early typically enjoy a significant advantage in price-growth margin.</p>' +
          '<h2>Business Potential at the Huong Duong Project</h2>' +
          '<p>Beyond being suitable for living, townhouses at the Huong Duong project also offer many attractive business opportunities.</p>' +
          '<p>Industries with strong growth potential include:</p>' +
          '<ul><li>Convenience stores.</li><li>Cafes.</li><li>Restaurants.</li><li>Representative offices.</li><li>Spas and beauty services.</li><li>Pharmacies.</li><li>Rental services for professionals.</li></ul>' +
          '<p>As population density continues to rise, demand for commercial services will grow strongly in the coming years.</p>' +
          '<h2>Investors Are Shifting Toward Tan Uyen</h2>' +
          '<p>The southern real estate market is witnessing a trend of capital shifting from high-priced areas toward markets that still have plenty of room to grow.</p>' +
          '<p>Tan Uyen now brings together all the factors that once helped Thu Duc surge ahead:</p>' +
          '<ul><li>Developed transport infrastructure.</li><li>Large-scale industrial parks.</li><li>Rapidly growing population.</li><li>Ample remaining land supply.</li><li>Clear planning policies.</li></ul>' +
          '<p>This is why an increasing number of investors are choosing Tan Uyen as a strategic destination in their long-term investment portfolios.</p>' +
          '<h2>Tan Uyen Real Estate Price Forecast for 2026–2030</h2>' +
          '<p>According to many market experts, Tan Uyen real estate is entering a new growth cycle driven by:</p>' +
          '<ul><li>The expansion of Ho Chi Minh City.</li><li>The development of VSIP 3.</li><li>The completion of the ring-road system.</li><li>Mechanical population growth.</li><li>Continuous FDI inflows into the region.</li></ul>' +
          '<p>In the 2026–2030 period, projects with prime locations, transparent legal status, and synchronized infrastructure are expected to grow more strongly than the general market.</p>' +
          '<h2>Who Should Invest in the Huong Duong Tan Uyen Project?</h2>' +
          '<h3>Long-Term Investors</h3>' +
          '<p>Those who want to get ahead of expanded Ho Chi Minh City\'s development and are seeking assets with the potential to increase in value over time.</p>' +
          '<h3>Genuine Homebuyers</h3>' +
          '<p>Young families looking for a modern living environment with full amenities at a reasonable price.</p>' +
          '<h3>Rental Investors</h3>' +
          '<p>Those looking to tap into rental demand from professionals, engineers, and workers at nearby industrial parks.</p>' +
          '<h3>Business Investors</h3>' +
          '<p>Those looking to leverage commercial-townhouse advantages to open a shop or lease out space.</p>' +
          '<p>As the real estate market enters a new cycle, Tan Uyen is emerging as one of the most promising areas in expanded Ho Chi Minh City. With advantages in location, infrastructure, industry, and urbanization pace, this area is drawing strong interest from investors nationwide.</p>' +
          '<p>The Huong Duong Tan Uyen project offers not only an ideal place to settle down but also a valuable long-term investment asset. Owning property here now is seen as a strategic move to get ahead of the new growth wave in eastern Ho Chi Minh City\'s real estate market.</p>' +
          '<p>Contact us now for the latest price list, incentive policies, and to choose the best location at the Huong Duong Tan Uyen project.</p>',
        coverImage: '/images/projects/khu-nha-o-huong-duong.webp',
        isPublished: true,
        publishedAt: new Date('2026-05-29T09:28:42+07:00'),
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'duong-tien-phat-diem-sang-bat-dong-san-khu-vuc-phat-trien-nang-dong',
        titleVi: 'Dương Tiến Phát – Điểm Sáng Bất Động Sản Tại Khu Vực Phát Triển Năng Động',
        titleEn: 'Duong Tien Phat – A Bright Spot in a Dynamically Developing Area',
        excerptVi: 'Trong bối cảnh thị trường bất động sản đang bước vào chu kỳ phục hồi, Dương Tiến Phát được đánh giá là một trong những dự án giàu tiềm năng tại khu vực phía Nam TP.HCM.',
        excerptEn: 'As the real estate market enters a recovery cycle, Duong Tien Phat is regarded as one of the most promising projects in the southern Ho Chi Minh City area.',
        contentVi:
          '<p>Trong bối cảnh thị trường bất động sản đang bước vào chu kỳ phục hồi, những dự án sở hữu vị trí chiến lược, pháp lý minh bạch và hạ tầng đồng bộ đang trở thành tâm điểm thu hút dòng tiền đầu tư. Nổi bật trong số đó, <strong>Dương Tiến Phát</strong> được đánh giá là một trong những dự án giàu tiềm năng tại khu vực phía Nam TP.HCM.</p>' +
          '<h2>Hưởng lợi từ hạ tầng giao thông và quy hoạch đồng bộ</h2>' +
          '<p>Tọa lạc tại phường Bình Cơ, TP.HCM, dự án Dương Tiến Phát nằm trong khu vực có tốc độ phát triển hạ tầng mạnh mẽ. Đặc biệt, sự hiện diện của các tuyến giao thông huyết mạch như Vành đai 4, Đại lộ Nam Tân Uyên và Đại lộ Uyên Hưng giúp gia tăng khả năng kết nối liên vùng.</p>' +
          '<p>Theo đánh giá của các chuyên gia, việc hạ tầng liên tục được nâng cấp sẽ là "đòn bẩy" quan trọng thúc đẩy giá trị bất động sản khu vực trong trung và dài hạn.</p>' +
          '<h2>Quy hoạch bài bản, đáp ứng nhu cầu an cư thực</h2>' +
          '<p>Dương Tiến Phát được quy hoạch trên diện tích hơn 4,1 ha, cung cấp 225 sản phẩm đất nền và nhà ở với diện tích đa dạng từ 70m² đến 170m². Mật độ xây dựng chỉ 43,1% cho thấy định hướng phát triển theo mô hình khu dân cư hiện đại, cân bằng giữa không gian sống và tiện ích.</p>' +
          '<p>Dự án tích hợp nhiều tiện ích nội khu như công viên cây xanh, khu vui chơi trẻ em, cảnh quan và đường dạo bộ, góp phần tạo nên môi trường sống trong lành, phù hợp với xu hướng đô thị xanh hiện nay.</p>' +
          '<h2>Gia tăng giá trị nhờ vị trí gần các khu công nghiệp lớn</h2>' +
          '<p>Một trong những yếu tố quan trọng giúp Dương Tiến Phát thu hút sự quan tâm của thị trường là vị trí gần các khu công nghiệp trọng điểm như Nam Tân Uyên, VSIP II và VSIP III (đang phát triển).</p>' +
          '<p>Sự hiện diện của các khu công nghiệp quy mô lớn kéo theo nhu cầu nhà ở tăng cao từ đội ngũ chuyên gia, kỹ sư và người lao động. Đây được xem là nền tảng vững chắc cho tiềm năng khai thác cho thuê cũng như gia tăng giá trị bất động sản trong tương lai.</p>' +
          '<h2>Pháp lý rõ ràng – Yếu tố tạo niềm tin cho nhà đầu tư</h2>' +
          '<p>Trong bối cảnh thị trường ngày càng chú trọng tính minh bạch, Dương Tiến Phát ghi điểm khi sở hữu pháp lý hoàn chỉnh với sổ hồng riêng từng nền và cho phép xây dựng tự do.</p>' +
          '<p>Theo các nhà đầu tư lâu năm, pháp lý rõ ràng không chỉ đảm bảo tính an toàn khi giao dịch mà còn giúp gia tăng khả năng thanh khoản – yếu tố then chốt trong đầu tư bất động sản.</p>' +
          '<h2>Cơ hội đầu tư trong giai đoạn thị trường phục hồi</h2>' +
          '<p>Với những lợi thế về vị trí, hạ tầng, tiện ích và pháp lý, Dương Tiến Phát được đánh giá là lựa chọn phù hợp cho cả người mua ở thực lẫn nhà đầu tư.</p>' +
          '<p>Trong bối cảnh giá bất động sản tại các khu vực trung tâm ngày càng cao, xu hướng dịch chuyển về các khu vực có quỹ đất lớn và hạ tầng phát triển đang trở nên rõ nét. Đây chính là cơ hội để các nhà đầu tư đón đầu làn sóng tăng trưởng mới.</p>',
        contentEn:
          '<p>As the real estate market enters a recovery cycle, projects with a strategic location, transparent legal status, and synchronized infrastructure are becoming the focal point for attracting investment capital. Standing out among them, <strong>Duong Tien Phat</strong> is regarded as one of the most promising projects in the southern Ho Chi Minh City area.</p>' +
          '<h2>Benefiting from Transport Infrastructure and Synchronized Planning</h2>' +
          '<p>Located in Binh Co Ward, Ho Chi Minh City, the Duong Tien Phat project sits in an area with strong infrastructure development momentum. Notably, the presence of arterial routes such as Ring Road 4, Nam Tan Uyen Boulevard, and Uyen Hung Boulevard boosts inter-regional connectivity.</p>' +
          '<p>According to experts, the continuous upgrading of infrastructure will be an important "lever" driving the area\'s real estate value in the medium and long term.</p>' +
          '<h2>Methodical Planning, Meeting Genuine Housing Needs</h2>' +
          '<p>Duong Tien Phat is planned across an area of more than 4.1 hectares, offering 225 land-plot and housing products with sizes ranging from 70m² to 170m². A building density of just 43.1% reflects a development approach modeled on a modern residential area, balancing living space with amenities.</p>' +
          '<p>The project integrates numerous on-site amenities such as a green park, a children\'s playground, landscaping, and walking paths, contributing to a fresh living environment in line with today\'s green-urban trend.</p>' +
          '<h2>Rising Value Thanks to Proximity to Major Industrial Parks</h2>' +
          '<p>One of the key factors drawing market interest to Duong Tien Phat is its location near key industrial parks such as Nam Tan Uyen, VSIP II, and VSIP III (under development).</p>' +
          '<p>The presence of large-scale industrial parks drives up housing demand from professionals, engineers, and workers. This is seen as a solid foundation for rental potential as well as future real estate value growth.</p>' +
          '<h2>Clear Legal Status – A Trust Factor for Investors</h2>' +
          '<p>As the market increasingly emphasizes transparency, Duong Tien Phat scores well by having complete legal status, with individual land titles per plot and freedom to build.</p>' +
          '<p>According to experienced investors, clear legal status not only ensures safety in transactions but also helps increase liquidity – a key factor in real estate investment.</p>' +
          '<h2>Investment Opportunity During the Market Recovery Phase</h2>' +
          '<p>With its advantages in location, infrastructure, amenities, and legal status, Duong Tien Phat is regarded as a suitable choice for both genuine homebuyers and investors.</p>' +
          '<p>As real estate prices in central areas keep rising, the trend of shifting toward areas with large land reserves and developing infrastructure is becoming increasingly clear. This is precisely the opportunity for investors to get ahead of the new growth wave.</p>',
        coverImage: '/images/projects/duong-tien-phat.webp',
        isPublished: true,
        publishedAt: new Date('2026-04-27T11:24:25+07:00'),
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'tan-uyen-central-point-diem-den-ly-tuong-cua-cac-nha-dau-tu',
        titleVi: 'Tân Uyên Central Point: Điểm Đến Lý Tưởng Của Các Nhà Đầu Tư',
        titleEn: 'Tan Uyen Central Point: An Ideal Destination for Investors',
        excerptVi: 'Tân Uyên Central Point (Dương Tiến Phát) là một dự án có nhiều tiềm năng vượt trội, không chỉ có lợi thế về vị trí đắc địa mà còn sở hữu nhiều tiện ích cảnh quan và ngoại khu ưu việt.',
        excerptEn: 'Tan Uyen Central Point (Duong Tien Phat) is a project with outstanding potential, offering not only a prime location but also excellent landscape amenities and surrounding conveniences.',
        contentVi:
          '<p><em>Tân Uyên Central Point ( Dương Tiến Phát ) là một dự án có nhiều tiềm năng vượt trội, không chỉ có lợi thế về vị trí đắc địa mà còn sở hữu nhiều tiện ích cảnh quan và ngoại khu ưu việt.</em></p>' +
          '<h3>Tân Uyên Central Point sở hữu vị trí đắt giá</h3>' +
          '<p>Vị trí là một trong những yếu tố hết sức quan trọng trong việc xác định dự án đầu tư. Một dự án có vị trí tốt sẽ giúp gia tăng giá trị một cách đáng kể. Cho nên, lựa chọn đúng bất động sản có vị trí đắc địa sẽ giúp nhà đầu tư đầu tư có hiệu quả.</p>' +
          '<p>Đối với dự án Tân Uyên Central Point không những sở hữu vị trí đẹp mà còn có lợi thế về cơ sở hạ tầng giao thông và gần kề các khu công nghiệp lớn, cho thấy tiềm năng tăng giá tại đây sẽ rất mạnh mẽ trong tương lai.</p>' +
          '<p>Dự án Tân Uyên Central Point thuộc phường Hội Nghĩa, thị xã Tân Uyên, đây là một trong những khu vực sắp lên thành phố trực thuộc tỉnh Bình Dương, sự kiện này sẽ giúp Tân Uyên ngày càng phát triển nhanh và mạnh về cả mặt kinh tế lẫn văn hóa - xã hội.</p>' +
          '<p>Không chỉ như thế, Tân Uyên Central Point đi qua các tuyến đường huyết mạch như vành đai 4, đại lộ Nam Tân Uyên, đại lộ Uyên Hưng – Thủ Dầu Một, ĐT 747, ĐT 746. Các tuyến đường này kết hợp tạo nên hệ thống giao thông đồng bộ, kết nối vùng mạnh mẽ giữa Bình Dương với trung tâm thành phố Hồ Chí Minh, Đồng Nai và Bình Phước, tạo điều kiện thuận lợi cho việc di chuyển, lưu thông hàng hóa và thúc đẩy giao thương giữa các khu vực này.</p>' +
          '<p>Tân Uyên Central Point với lợi thế gần kề các khu công nghiệp lớn như KCN Nam Tân Uyên, KCN VSIP II và đặc biệt là sự xuất hiện của KCN VSIP III đã tạo tiềm năng cho rất lớn cho việc phát triển và thu hút các nhà đầu tư không chỉ trong nước và còn cả nước ngoài.</p>' +
          '<p>Và hơn hết, các khu công nghiệp lớn này đã thu hút và đem lại nguồn lao động dồi dào cho Tân Uyên nói riêng và Bình Dương nói chung. Từ đó cho thấy, nhu cầu về nhà ở và các dịch vụ phục vụ cho cuộc sống cũng theo đó mà ngày càng phát triển.</p>' +
          '<p>Như vậy, Tân Uyên Central Point được hình thành nhằm giải quyết vấn đề nhà ở tại khu vực này trong thời gian tới và cũng mong muốn đem đến một cuộc sống thuận tiện với đầy đủ các tiện nghi cho các cư dân ở đây.</p>' +
          '<h3>Cảnh quan đa dạng tận hưởng cuộc sống</h3>' +
          '<p>Sau khi trải qua thời gian khủng hoảng do dịch bệnh, mọi người có xu hướng sống xanh, dịch chuyển đến các vùng ven thành phố, nơi không khí trong lành, con người được hòa mình vào thiên nhiên và hơn hết để hạn chế lây lan các loại dịch bệnh, virus.</p>' +
          '<p>Đó chính là lý do mà Tân Uyên Central Point có hệ thống cảnh quan vô cùng đặc sắc và đa dạng, hoàn toàn dựa trên xu hướng về môi trường sống lành mạnh của con người hiện nay.</p>' +
          '<p>Tại Tân Uyên Central Point, mọi người sẽ được tận hưởng trọn vẹn những cung bậc cảm xúc với cối xay gió khổng lồ, cây bồ công anh phát sáng, với con đường uốn quanh bờ suối đầy lung linh, ảo diệu và phố đèn lồng thơ mộng. Một nơi thích hợp để tản bộ và checkin, lưu giữ những khoảnh khắc ý nghĩa bên cạnh những người thân yêu.</p>' +
          '<figure class="my-6"><img src="/images/projects/tan-uyen-central-point-1.webp" alt="Tiện ích cảnh quan đa dạng tại Tân Uyên Central Point." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Tiện ích cảnh quan đa dạng tại Tân Uyên Central Point.</figcaption></figure>' +
          '<p>Một trong những cảnh quan tâm đắc nhất tại Tân Uyên Central Point chính là khu công viên liên hoàn, nơi kết hợp giữa khu vui chơi của trẻ em với dụng cụ tập thể dục. Bên cạnh đảm bảo cho con em cư trú tại Tân Uyên Central Point có một tuổi thơ đúng nghĩa và môi trường phát triển toàn diện thì đây chính là nơi gắn kết tình cảm yêu thương của những người sinh sống tại đây.</p>' +
          '<p>Ngoài ra, những cư dân sinh sống ở đây cũng sẽ được sở hữu các cảnh quan khác như đồi cỏ cảnh quan, con đường bán nguyệt, cổng trời vô cực, đem con người đến gần hơn với thiên nhiên để cảm nhận được những giá trị hạnh phúc mà Tân Uyên Central Point mang lại.</p>' +
          '<h3>Tiện ích ngoại khu vượt trội thuận tiện kết nối</h3>' +
          '<p>Đến với Tân Uyên Central Point là đến với tâm điểm của sự kết nối. Khi từ Tân Uyên Central Point sẽ chỉ mất chưa đầy 30 phút là có thể đến các địa điểm như bệnh viện, trường học, trung tâm hành chính, chợ, UBND xã Tân Uyên,… rất thuận tiện.</p>' +
          '<figure class="my-6"><img src="/images/projects/tan-uyen-central-point-2.webp" alt="Tân Uyên Central Point sở hữu tiện ích ngoại khu vượt trội." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Tân Uyên Central Point sở hữu tiện ích ngoại khu vượt trội.</figcaption></figure>' +
          '<p>Các tiện ích ngoại khu đầy đủ sẽ đáp ứng tốt mọi nhu cầu thiết yếu của mỗi cư dân sinh sống tại đây, giúp mọi người yên tâm an cư lạc nghiệp.</p>' +
          '<p>Với những lợi ích vượt trội chỉ có tại Tân Uyên Central Point, dự án này hứa hẹn sẽ mang lại nhiều tiềm năng không chỉ cho nhà đầu tư mà còn cả các hoạt động kinh doanh và là sự đầu tư an toàn cho dân cư trú tại đây.</p>',
        contentEn:
          '<p><em>Tan Uyen Central Point (Duong Tien Phat) is a project with outstanding potential, offering not only a prime location but also excellent landscape amenities and surrounding conveniences.</em></p>' +
          '<h3>Tan Uyen Central Point Holds a Prime Location</h3>' +
          '<p>Location is one of the most important factors in determining an investment project. A project with a good location will significantly increase in value. Therefore, choosing the right property with a prime location will help investors invest effectively.</p>' +
          '<p>The Tan Uyen Central Point project not only has a beautiful location but also benefits from transport infrastructure and proximity to major industrial parks, showing that its price-growth potential will be very strong in the future.</p>' +
          '<p>The Tan Uyen Central Point project is located in Hoi Nghia Ward, Tan Uyen Town, one of the areas soon to become a city under Binh Duong province – an event that will help Tan Uyen develop faster and stronger both economically and socio-culturally.</p>' +
          '<p>Not only that, Tan Uyen Central Point runs along arterial routes such as Ring Road 4, Nam Tan Uyen Boulevard, Uyen Hung – Thu Dau Mot Boulevard, DT 747, and DT 746. Combined, these routes form a synchronized transport system, strongly connecting Binh Duong with central Ho Chi Minh City, Dong Nai, and Binh Phuoc, facilitating travel, goods circulation, and trade between these areas.</p>' +
          '<p>Tan Uyen Central Point, with the advantage of being near major industrial parks such as Nam Tan Uyen IP, VSIP II IP, and especially the emergence of VSIP III IP, has created enormous potential for development and for attracting investors, both domestic and foreign.</p>' +
          '<p>Above all, these large industrial parks have attracted and brought an abundant labor force to Tan Uyen in particular and Binh Duong in general. This shows that demand for housing and life-supporting services is growing accordingly.</p>' +
          '<p>As such, Tan Uyen Central Point was formed to address the housing issue in this area going forward, while also aiming to bring a convenient life with full amenities to its residents.</p>' +
          '<h3>Diverse Landscapes to Enjoy Life</h3>' +
          '<p>After going through a period of crisis due to disease, people have tended toward green living, moving to areas on the outskirts of the city where the air is fresh, people can immerse themselves in nature, and above all, limit the spread of epidemics and viruses.</p>' +
          '<p>That is precisely why Tan Uyen Central Point has an exceptionally distinctive and diverse landscape system, built entirely around today\'s trend toward a healthy living environment.</p>' +
          '<p>At Tan Uyen Central Point, everyone will fully enjoy a range of emotions with giant windmills, glowing dandelion sculptures, a path winding along a shimmering, magical stream, and a poetic lantern street. A place suited for strolling and taking photos, preserving meaningful moments alongside loved ones.</p>' +
          '<figure class="my-6"><img src="/images/projects/tan-uyen-central-point-1.webp" alt="Diverse landscape amenities at Tan Uyen Central Point." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Diverse landscape amenities at Tan Uyen Central Point.</figcaption></figure>' +
          '<p>One of the most cherished landscapes at Tan Uyen Central Point is the interconnected park complex, which combines a children\'s play area with exercise equipment. Besides ensuring that children residing at Tan Uyen Central Point have a genuine childhood and a well-rounded environment to grow up in, this is also a place that strengthens the bonds of affection among residents living here.</p>' +
          '<p>In addition, residents living here will also enjoy other landscape features such as a landscaped grass hill, a crescent-shaped path, and an infinity sky gate, bringing people closer to nature to feel the happiness that Tan Uyen Central Point brings.</p>' +
          '<h3>Outstanding Off-Site Amenities for Convenient Connectivity</h3>' +
          '<p>Coming to Tan Uyen Central Point means coming to the center of connectivity. From Tan Uyen Central Point, it takes less than 30 minutes to reach places such as hospitals, schools, the administrative center, markets, the Tan Uyen commune People\'s Committee, and more – all very convenient.</p>' +
          '<figure class="my-6"><img src="/images/projects/tan-uyen-central-point-2.webp" alt="Tan Uyen Central Point offers outstanding off-site amenities." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Tan Uyen Central Point offers outstanding off-site amenities.</figcaption></figure>' +
          '<p>The full range of off-site amenities will well serve every essential need of residents living here, helping everyone settle down and build their lives with peace of mind.</p>' +
          '<p>With these outstanding benefits found only at Tan Uyen Central Point, this project promises to bring great potential not only for investors but also for business activities, and to be a safe investment for residents living here.</p>',
        coverImage: '/images/projects/duong-tien-phat.webp',
        isPublished: true,
        publishedAt: new Date('2019-05-31T18:07:41+07:00'),
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'thang-long-house-don-song-dau-tu-tu-vanh-dai-4-va-vsip-iii',
        titleVi: 'Thăng Long House Đón Sóng Đầu Tư Từ Vành Đai 4 Và VSIP III',
        titleEn: 'Thang Long House Welcomes an Investment Wave from Ring Road 4 and VSIP III',
        excerptVi: 'Vành đai 4 dự kiến trình Quốc hội vào kỳ họp đầu năm 2025, ký kết hợp đồng và khởi công vào đầu năm 2026. Khi hoàn thành, đây sẽ là bàn đạp tăng trưởng cho dự án Thăng Long House.',
        excerptEn: 'Ring Road 4 is expected to be presented to the National Assembly in early 2025 and begin construction in early 2026 - a springboard for growth at the Thang Long House project.',
        contentVi:
          '<p class="singular-sapo">Vành đai 4 dự kiến trình Quốc hội vào kỳ họp đầu năm 2025, ký kết hợp đồng và khởi công vào đầu năm 2026. Khi hoàn thành, Vành đai 4 sẽ là bàn đạp tăng trưởng cho bất động sản khu vực, trong đó có dự án Thăng Long House.</p>' +
          '<h3>Vành đai 4 tạo đà phát triển cho bất động sản Bình Dương</h3>' +
          '<p>Đường Vành đai 4 có tổng chiều dài khoảng 207km, đi qua 5 tỉnh, thành phố: Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, TPHCM và Long An. Khi hoàn thành, tuyến đường này sẽ mở ra các hướng di chuyển thuận lợi giữa các khu vực Đông Nam Bộ, Tây Nguyên và Đồng bằng sông Cửu Long (ĐBSCL).</p>' +
          '<p>Đồng thời, Vành đai 4 sẽ kết nối các khu công nghiệp, cảng biển và trung tâm kinh tế của khu vực, tạo điều kiện thuận lợi cho giao thương và phát triển kinh tế.</p>' +
          '<p><em>Quy hoạch hướng tuyến Vành đai 4.</em></p>' +
          '<p>Bình Dương, với vị trí chiến lược tiếp giáp TPHCM, được xem là một trong những địa phương hưởng lợi nhiều nhất từ dự án Vành đai 4. Tuyến đường này tại Bình Dương dài khoảng 48km, đi qua các địa phương như Bắc Tân Uyên, TP Tân Uyên, TP Bến Cát, kết nối các khu công nghiệp (KCN) lớn như VSIP III, VSIP II, Mỹ Phước, Bàu Bàng, tạo điều kiện thuận lợi cho việc vận chuyển hàng hóa và thu hút đầu tư.</p>' +
          '<p>Theo các chuyên gia bất động sản, việc Vành đai 4 được triển khai sẽ tác động mạnh đến thị trường bất động sản Bình Dương, đặc biệt là phân khúc đất nền và nhà ở tại các khu vực gần tuyến đường. Giá trị bất động sản tại các khu vực này được dự báo sẽ tăng trưởng trong thời gian tới, khi hạ tầng giao thông hoàn thiện và kết nối vùng được cải thiện.</p>' +
          '<h3>Dự án Thăng Long House đón sóng Vành đai 4 và VSIP III</h3>' +
          '<p>Trong bối cảnh thị trường bất động sản Bình Dương đang "nóng" lên từng ngày nhờ cú hích hạ tầng, nhu cầu về một không gian sống chất lượng, tiện nghi và gần gũi thiên nhiên ngày càng được chú trọng. Nắm bắt xu hướng này, Công ty Cổ phần Bất động sản Cona Land – đơn vị phát triển dự án, đã ra mắt khu nhà ở Thăng Long House, tọa lạc tại phường Tân Hiệp, TP Tân Uyên, tỉnh Bình Dương, hứa hẹn mang đến một cơ hội khởi nguồn cuộc sống thịnh vượng cho cư dân.</p>' +
          '<figure class="my-6"><img src="/images/projects/thang-long-house-news.webp" alt="Phối cảnh dự án Thăng Long House." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Phối cảnh dự án Thăng Long House.</figcaption></figure>' +
          '<p>Với đặc điểm vị trí vượt trội, Thăng Long House đáp ứng tiêu chuẩn sống kép của giới chuyên gia làm việc tại các KCN: vừa đủ gần để kết nối, vừa đủ xa để yên tĩnh.</p>' +
          '<p>Nằm ngay trung tâm kết nối 4 KCN bậc nhất Bình Dương (VSIP III, VSIP II, Nam Tân Uyên, Nam Tân Uyên mở rộng), được bao quanh bởi các tuyến đường huyết mạch như DT747A, Đại lộ Nam Tân Uyên, Đại lộ Uyên Hưng và Vành đai 4, Thăng Long House tạo điều kiện thuận lợi cho cư dân di chuyển và kết nối đến các khu vực lân cận một cách nhanh chóng. Đồng thời, dự án vẫn đảm bảo khoảng cách hợp lý để tách biệt khỏi sự ồn ào của khu công nghiệp, mang đến không gian sống yên tĩnh, riêng tư.</p>' +
          '<p>Hiện tại, Thăng Long House đang triển khai giai đoạn đầu. Đây là cơ hội cho những khách hàng muốn sở hữu bất động sản tại Bình Dương với đặc quyền giá gốc, đón đầu tiềm năng tăng giá khi hạ tầng hoàn thiện.</p>',
        contentEn:
          '<p>Ring Road 4 is expected to be presented to the National Assembly at its early-2025 session, with contracts signed and construction starting in early 2026. Once completed, Ring Road 4 will be a springboard for growth for real estate in the region, including the Thang Long House project.</p>' +
          '<h3>Ring Road 4 Creates Development Momentum for Binh Duong Real Estate</h3>' +
          '<p>Ring Road 4 has a total length of about 207km, passing through 5 provinces and cities: Ba Ria – Vung Tau, Dong Nai, Binh Duong, Ho Chi Minh City, and Long An. Once completed, this route will open up convenient travel directions between the Southeast region, the Central Highlands, and the Mekong Delta.</p>' +
          '<p>At the same time, Ring Road 4 will connect industrial parks, seaports, and economic centers of the region, facilitating trade and economic development.</p>' +
          '<p><em>Planned alignment of Ring Road 4.</em></p>' +
          '<p>Binh Duong, with its strategic location bordering Ho Chi Minh City, is considered one of the localities that benefits most from the Ring Road 4 project. This route in Binh Duong is about 48km long, passing through localities such as Bac Tan Uyen, Tan Uyen City, and Ben Cat City, connecting major industrial parks such as VSIP III, VSIP II, My Phuoc, and Bau Bang, facilitating goods transport and attracting investment.</p>' +
          '<p>According to real estate experts, the implementation of Ring Road 4 will strongly impact the Binh Duong real estate market, especially the land-plot and housing segments in areas near the route. Property values in these areas are forecast to grow in the coming period as transport infrastructure is completed and regional connectivity improves.</p>' +
          '<h3>Thang Long House Welcomes the Ring Road 4 and VSIP III Wave</h3>' +
          '<p>As the Binh Duong real estate market heats up day by day thanks to the infrastructure boost, demand for a quality, convenient living space close to nature is increasingly emphasized. Capturing this trend, Cona Land Real Estate JSC – the project developer – has launched the Thang Long House residential area, located in Tan Hiep Ward, Tan Uyen City, Binh Duong Province, promising to bring residents an opportunity to begin a prosperous life.</p>' +
          '<figure class="my-6"><img src="/images/projects/thang-long-house-news.webp" alt="Perspective rendering of the Thang Long House project." loading="lazy" class="w-full rounded-lg" /><figcaption class="text-sm text-ink-muted text-center mt-2">Perspective rendering of the Thang Long House project.</figcaption></figure>' +
          '<p>With its outstanding location characteristics, Thang Long House meets the dual living standard sought by professionals working at the industrial parks: close enough to stay connected, yet far enough to stay quiet.</p>' +
          '<p>Sitting right at the center connecting Binh Duong\'s 4 leading industrial parks (VSIP III, VSIP II, Nam Tan Uyen, Nam Tan Uyen Expansion), and surrounded by arterial routes such as DT747A, Nam Tan Uyen Boulevard, Uyen Hung Boulevard, and Ring Road 4, Thang Long House gives residents convenient, fast travel and connectivity to nearby areas. At the same time, the project still maintains a reasonable distance to stay separated from industrial-park noise, offering a quiet, private living space.</p>' +
          '<p>Thang Long House is currently rolling out its first phase. This is an opportunity for customers who want to own property in Binh Duong at original pricing, getting ahead of the price-growth potential as infrastructure is completed.</p>',
        coverImage: '/images/projects/thang-long-house-news.webp',
        isPublished: true,
        publishedAt: new Date('2019-05-31T18:06:41+07:00'),
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'khu-nha-o-huong-duong-chuan-song-moi-giua-trung-tam-do-thi-cong-nghiep-phia-nam',
        titleVi: 'Khu Nhà Ở Hướng Dương – Chuẩn Sống Mới Giữa Trung Tâm Đô Thị Công Nghiệp Phía Nam',
        titleEn: 'Huong Duong Residential Area – A New Living Standard in the Heart of the Southern Industrial Urban Center',
        excerptVi: 'Khu nhà ở Hướng Dương tọa lạc ngay phường Tân Hiệp, tiếp giáp Đại lộ Nam Tân Uyên và Đại lộ Uyên Hưng – Thủ Dầu Một, giao thoa giữa các khu công nghiệp trọng điểm như VSIP III.',
        excerptEn: 'The Huong Duong residential area sits in Tan Hiep Ward, bordering Nam Tan Uyen Boulevard and Uyen Hung – Thu Dau Mot Boulevard, at the crossroads of key industrial parks such as VSIP III.',
        contentVi:
          '<h3>1. Tọa độ vàng kết nối vùng kinh tế trọng điểm</h3>' +
          '<p>Khu nhà ở Hướng Dương tọa lạc ngay phường Tân Hiệp – khu vực vừa được sáp nhập về TP.HCM, tiếp giáp Đại lộ Nam Tân Uyên và Đại lộ Uyên Hưng – Thủ Dầu Một. Đây là vị trí giao thoa giữa các khu công nghiệp trọng điểm như VSIP III, Nam Tân Uyên mở rộng, tạo đà tăng trưởng vượt bậc cho cả khu vực.</p>' +
          '<p>Sở hữu vị trí vàng tại nút giao chiến lược của siêu vòng xoay liên tỉnh – điểm kết nối huyết mạch của các trục giao thông trọng yếu. Dự án mở ra khả năng kết nối đa hướng, thuận tiện di chuyển, dễ dàng tiếp cận các khu đô thị và công nghiệp trọng điểm.</p>' +
          '<h3>2. Quy hoạch bài bản – Pháp lý minh bạch</h3>' +
          '<p>Dự án có tổng quy mô 2,2 ha, cung cấp 150 căn nhà phố liền kề với diện tích từ 58m² đến hơn 121m². Hạ tầng được đầu tư đồng bộ: đường nội khu 10.5–13m, hệ thống điện đi ngầm, xử lý nước thải từ BIWASE… Tất cả đều đã có giấy phép rõ ràng: quy hoạch 1/500, giấy phép xây dựng, chuyển mục đích sử dụng đất rõ ràng – giúp khách hàng an tâm sở hữu.</p>' +
          '<h3>3. Tiện ích nội khu – Hướng đến cộng đồng hiện đại</h3>' +
          '<p>Từ sân thể thao Pickleball, công viên chủ đề Aura Park, siêu thị, phòng gym, trung tâm tiếng Anh, trường mầm non nội khu đến khu vui chơi trẻ em, khu thể thao ngoài trời… mọi tiện ích đều hướng đến phong cách sống hiện đại, tiện nghi.</p>' +
          '<h3>4. Cơ hội tăng giá bền vững</h3>' +
          '<p>P. Tân Hiệp đang trở thành điểm sáng đầu tư mới sau khi chính thức được sáp nhập vào TP.HCM, tạo cú hích lớn về quy hoạch – hạ tầng – giá trị đất đai. Trong bối cảnh dòng vốn đang quay lại thị trường, bất động sản trung tâm công nghiệp như Khu nhà ở Hướng Dương được đánh giá là nơi lý tưởng để an cư và đón đầu chu kỳ tăng trưởng 2024–2027.</p>',
        contentEn:
          '<h3>1. A Golden Coordinate Connecting a Key Economic Region</h3>' +
          '<p>The Huong Duong residential area sits right in Tan Hiep Ward – an area just merged into Ho Chi Minh City – bordering Nam Tan Uyen Boulevard and Uyen Hung – Thu Dau Mot Boulevard. This is a crossroads among key industrial parks such as VSIP III and Nam Tan Uyen Expansion, creating exceptional growth momentum for the whole area.</p>' +
          '<p>It holds a golden position at the strategic junction of an inter-provincial mega-roundabout – a vital connection point for major transport arteries. The project opens up multi-directional connectivity, convenient travel, and easy access to key urban and industrial areas.</p>' +
          '<h3>2. Methodical Planning – Transparent Legal Status</h3>' +
          '<p>The project has a total scale of 2.2 hectares, offering 150 adjoining townhouses with sizes from 58m² to over 121m². Infrastructure is synchronously invested: interior roads 10.5–13m wide, underground electrical systems, wastewater treatment from BIWASE, and more. Everything already has clear approvals: 1/500 planning, construction permit, and clear land-use conversion – giving customers peace of mind in ownership.</p>' +
          '<h3>3. On-Site Amenities – Oriented Toward a Modern Community</h3>' +
          '<p>From a pickleball court, the Aura Park themed park, a supermarket, a gym, an English center, an on-site kindergarten, to a children\'s playground and outdoor sports areas – every amenity is oriented toward a modern, convenient lifestyle.</p>' +
          '<h3>4. Sustainable Price-Growth Opportunity</h3>' +
          '<p>Tan Hiep Ward is becoming a new investment bright spot after officially being merged into Ho Chi Minh City, creating a major boost in planning, infrastructure, and land value. As capital flows return to the market, industrial-center real estate such as the Huong Duong residential area is regarded as an ideal place to settle down and get ahead of the 2024–2027 growth cycle.</p>',
        coverImage: '/images/projects/huong-duong-news.webp',
        isPublished: true,
        publishedAt: new Date('2019-05-31T18:05:36+07:00'),
        createdAt: now,
        updatedAt: now,
      },
      {
        slug: 'trai-nghiem-tien-ich-tang-cao-lua-chon-hoan-my-cho-ngoi-nha-hien-dai',
        titleVi: 'Trải Nghiệm Tiện Ích Tầng Cao – Lựa Chọn Hoàn Mỹ Cho Ngôi Nhà Hiện Đại',
        titleEn: 'Experiencing High-Floor Amenities – The Perfect Choice for a Modern Home',
        excerptVi: 'Lựa chọn môi trường sống tích hợp nhiều tiện ích đang là xu hướng chung của nhiều cư dân hiện nay. Opal Boulevard mang đến một không gian sống lý tưởng cho các cư dân hiện đại.',
        excerptEn: 'Choosing a living environment integrated with many amenities is a common trend among residents today. Opal Boulevard offers an ideal living space for modern residents.',
        contentVi:
          '<p><em>Lựa chọn môi trường sống tích hợp nhiều tiện ích đang là xu hướng chung của nhiều cư dân hiện nay. Opal Boulevard – Khu căn hộ cao cấp mới nhất trên trục đường Phạm Văn Đồng với tổ hợp tiện ích phong phú, năng động hứa hẹn sẽ mang đến một không gian sống lý tưởng cho các cư dân hiện đại.</em></p>' +
          '<h3>Xu hướng lựa chọn nhà ở hiện nay</h3>' +
          '<p>Năm 2018 vừa qua có đến 94.2% tổng sản phẩm dự án nhà ở được phát triển tại TP.HCM thuộc về phân khúc căn hộ (số liệu từ Hiệp Hội Bất Động Sản Việt Nam). Theo đó, nhu cầu sở hữu các căn hộ chung cư với tiện ích đầy đủ, an ninh, sạch sẽ, giao thông thuận tiện được các chuyên gia dự đoán sẽ tiếp tục là xu hướng chọn nhà trong tương lai.</p>' +
          '<p>Khảo sát cho thấy, so với loại hình nhà đất, căn hộ chung cư có nhiều ưu điểm về mức giá hợp lý, có nhiều chính sách tài chính hỗ trợ người mua, thường gần các trục đường chính, môi trường trong lành và sạch sẽ, an ninh, có hệ thống bảo vệ chuyên nghiệp và đội ngũ quản lý tốt… Bên cạnh đó, đa số các căn hộ tầm trung cao cấp trở lên đều tích hợp nhiều tiện ích sống phục vụ các nhu cầu sinh hoạt giao lưu, giải trí, thể thao nâng cao sức khoẻ… Đây cũng là tiêu chí rất quan trọng được khách hàng đầu tư lẫn an cư ưu tiên hàng đầu khi đưa ra quyết định mua căn hộ.</p>' +
          '<p>Việc tích hợp nhiều tiện ích phục vụ cuộc sống vào nội khu dự án không chỉ giúp tiết kiệm thời gian di chuyển mà còn tạo môi trường sống tiện nghi, năng động cho các cư dân thụ hưởng và mọi người kết nối với nhau tạo thành một cộng đồng văn minh, nhân văn và đầy sức sống.</p>' +
          '<h3>Opal Boulevard – Nơi hội tụ các tiện ích tầm cao đẳng cấp</h3>' +
          '<p>Opal Boulevard sở hữu vị trí giao thương chiến lược khi tọa lạc ngay trên trục đường vàng Phạm Văn Đồng – một trong những con đường nội đô đẹp nhất TP.HCM. Cư dân sinh sống tại đây chỉ mất 15 phút để di chuyển tới sân bay Tân Sơn Nhất hay có thể đi vào trung tâm thành phố như Q1, Q.2, Phú Nhuận, Bình Thạnh trong vòng 20-30 phút.</p>' +
          '<p>Điểm nhấn của Opal Boulevard là sự hội tụ của 25 tiện ích tầm cao thời thượng được bố trí trên tầng 4 của mỗi tháp, tạo thành 2 khu tiện ích riêng biệt cho từng tòa tháp giúp cư dân dễ dàng thụ hưởng các giá trị sống thượng lưu ngay trước cửa nhà.</p>' +
          '<p>Hồ bơi được thiết kế thành 2 khu gồm hồ bơi người lớn và trẻ em sẽ mang đến cho cư dân những phút giây thư giãn lý tưởng khi thả mình trong làn nước xanh mát, ngắm nhìn vẻ đẹp rạng ngời của đất trời lúc bình minh, hay thưởng thức ly cocktail tuyệt hảo bên bờ hồ với bạn bè và nghe nhạc du dương ngắm nhìn thành phố về đêm lên đèn lung linh huyền ảo.</p>' +
          '<p><em>"Sức khỏe mới là tài sản quý giá thực sự, chứ không phải là vàng hay bạc"</em> như nhà hiền triết vĩ đại người Ấn, Mahatma Gandhi từng nhận xét. Xuất phát từ chân lý đó, Opal Boulevard được đầu tư trang bị các khu tập gym, yoga hiện đại, đường chạy bộ ngoài trời, hồ bơi tràn bờ, khu vực leo núi trẻ em… nhằm giúp cư dân tăng cường sức khỏe, sự dẻo dai mang lại tinh thần minh mẫn, sảng khoái, nâng cao hiệu quả trong học tập và làm việc. Sống yêu vận động thực sự là tinh thần của những cư dân Opal Boulevard trẻ năng động trong việc rèn luyện sức khỏe, phát triển sự nghiệp và xây dựng đất nước giàu mạnh.</p>' +
          '<p>Một điểm nhấn khác biệt nữa của dự án là vườn ươm tri thức được thiết kế với mục tiêu kiến tạo không gian trau dồi kiến thức, khơi dậy niềm đam mê đọc sách nhằm góp phần tạo nên cộng đồng dân cư văn minh và tri thức. Tại vườn tri thức, chủ đầu tư sẽ bố trí bàn ghế trong không gian mở, rộng rãi, tạo điều kiện tốt nhất để cư dân, trẻ em có thể thưởng thức từng quyển sách hay, lan tỏa niềm đam mê đọc sách nhằm góp phần phát triển một thế hệ trẻ trưởng thành cả về trí tuệ và nhân cách.</p>' +
          '<p>Bên cạnh các tiện ích đẳng cấp được đầu tư ở tầng 4, dự án còn bố trí thêm nhiều tiện ích khác trong khuôn viên như sảnh đón khách sang trọng, khu mua sắm, siêu thị mini, khu BBQ, nhà trẻ, đường nội bộ… giúp cư dân có những buổi tụ họp cuối tuần bình yên bên gia đình hay thoải mái tản bộ trên các con đường nội khu của dự án.</p>' +
          '<p>Một ngôi nhà lý tưởng là ngôi nhà mà bạn luôn muốn trở về. Một không gian sống lý tưởng là không gian cho bạn cảm giác thoải mái thư giãn ngoài giờ làm việc; là nơi mà con cái có không gian vui chơi và có điều kiện để phát triển toàn diện cả về thể chất và tinh thần. Lựa chọn Opal Boulevard cũng là lựa chọn một lối sống năng động, tiện nghi, hiện đại cho bạn và gia đình.</p>',
        contentEn:
          '<p><em>Choosing a living environment integrated with many amenities is a common trend among residents today. Opal Boulevard – the newest premium apartment complex on Pham Van Dong Boulevard – with a rich, dynamic amenity complex promises to bring an ideal living space to modern residents.</em></p>' +
          '<h3>Today\'s Home-Buying Trends</h3>' +
          '<p>In 2018, as much as 94.2% of total housing project products developed in Ho Chi Minh City belonged to the apartment segment (data from the Vietnam Real Estate Association). Accordingly, demand for apartments with full amenities, security, cleanliness, and convenient transport is predicted by experts to remain the home-buying trend going forward.</p>' +
          '<p>Surveys show that, compared with landed housing, condominium apartments have many advantages: reasonable pricing, numerous financial policies supporting buyers, typically close to main roads, a fresh and clean environment, security with a professional guard system and a good management team, and more. In addition, most mid-to-premium-tier apartments integrate many lifestyle amenities serving social, entertainment, and health-boosting sports needs. This is also a very important criterion that both investors and homebuyers prioritize when deciding to purchase an apartment.</p>' +
          '<p>Integrating many life-serving amenities within a project\'s premises not only saves travel time but also creates a convenient, dynamic living environment for residents to enjoy, connecting everyone together to form a civilized, humane, and vibrant community.</p>' +
          '<h3>Opal Boulevard – Where Premium High-Floor Amenities Converge</h3>' +
          '<p>Opal Boulevard holds a strategic trading location, situated right on the golden route of Pham Van Dong Boulevard – one of the most beautiful inner-city roads in Ho Chi Minh City. Residents living here only need 15 minutes to travel to Tan Son Nhat Airport, or can reach the city center such as District 1, District 2, Phu Nhuan, and Binh Thanh within 20-30 minutes.</p>' +
          '<p>The highlight of Opal Boulevard is the convergence of 25 fashionable high-floor amenities arranged on the 4th floor of each tower, forming 2 separate amenity zones for each tower, helping residents easily enjoy upper-class living values right at their doorstep.</p>' +
          '<p>The swimming pool is designed into 2 zones, an adult pool and a children\'s pool, bringing residents ideal relaxing moments as they immerse themselves in cool blue water, admire the radiant beauty of the sky at dawn, or enjoy an excellent cocktail by the poolside with friends while listening to melodious music and gazing at the city lit up magically at night.</p>' +
          '<p><em>"Health is the real wealth, not gold or silver"</em>, as the great Indian sage Mahatma Gandhi once remarked. Stemming from that truth, Opal Boulevard is invested with modern gym and yoga areas, outdoor jogging tracks, an infinity-edge swimming pool, a children\'s climbing area, and more, to help residents strengthen their health and stamina, bringing a clear, refreshed spirit and improving effectiveness in study and work. Loving to stay active truly reflects the spirit of Opal Boulevard\'s young, dynamic residents in building their health, developing their careers, and building a prosperous country.</p>' +
          '<p>Another distinctive highlight of the project is the knowledge nursery garden, designed with the goal of creating a space to cultivate knowledge and spark a passion for reading, contributing to a civilized and knowledgeable resident community. At the knowledge garden, the developer will arrange tables and chairs in an open, spacious setting, creating the best conditions for residents and children to enjoy every good book, spreading a passion for reading that helps develop a young generation that matures both intellectually and in character.</p>' +
          '<p>Besides the premium amenities invested on the 4th floor, the project also arranges many other amenities within its grounds, such as an elegant reception lobby, a shopping area, a mini-mart, a BBQ area, a nursery, and internal roads, helping residents enjoy peaceful weekend gatherings with family or comfortably stroll along the project\'s internal streets.</p>' +
          '<p>An ideal home is a home you always want to return to. An ideal living space is a space that gives you a feeling of comfort and relaxation outside working hours; it is a place where children have room to play and the conditions to develop fully, both physically and mentally. Choosing Opal Boulevard is also choosing a dynamic, convenient, modern lifestyle for you and your family.</p>',
        coverImage: '/images/projects/bcons-city-life.webp',
        isPublished: true,
        publishedAt: new Date('2019-05-31T18:04:27+07:00'),
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
