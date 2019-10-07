import { parse, DefaultTreeDocument } from 'parse5'
import { htmlToAmp } from '../src'

const expectTransform = async (htmlTag: string, ampTag: string) => {
	const parsedHTMLTag = parse(htmlTag.trim()) as DefaultTreeDocument
	expect(await htmlToAmp(parsedHTMLTag)).toBe(ampTag)
}

describe('Convert Image to <amp-img>', () => {
	test.each([
		[
			'<img src="https://picsum.photos/id/59/1920/1080" />',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img src="https://picsum.photos/id/59/1920/1080" layout="responsive" width="1920" height="1080"></amp-img></div>',
		],
		[
			'<img src="https://picsum.photos/id/871/1080/1920" />',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img src="https://picsum.photos/id/871/1080/1920" layout="responsive" width="1080" height="1920"></amp-img></div>',
		],
		[
			'<img alt="alt=&quot;iRuler Express&quot;" src="https://www.blognone.com/sites/default/files/externals/3d24d62491fadc2d60705ad40bda0784.png" ><img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_15061911184757_161880.png" width="50%" /><img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_150619111846MI_161880.png" width="50%" /><img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_150619111843Sw_161880.png" width="50%" /></p>\n<p>สามารถดาวน์โหลดได้ในระบบ iOS คลิกลิงก์ด้านล่างเพื่อดาวน์โหลดได้ที่ App Store</p>\n<p><a href="https://itunes.apple.com/us/app/iruler-express/id997794197?l=th&amp;ls=1&amp;mt=8"><img alt="No Description" src="https://www.blognone.com/sites/default/files/externals/834435d3ead34adddadc7e92dbf1f615.jpg" ></a></p>\n<p><a href="https://itunes.apple.com/us/app/measure-map-pro/id1106880437?l=th&amp;ls=1&amp;mt=8">Dowanload iRuler Express</a></p>\n<p>ท่านสามารถติดตามข่าวสารของแอพพลิเคชันได้ที่</p>\n<p><a href="https://www.facebook.com/pages/Funbook/365509203579475">https://www.facebook.com/pages/Funbook</a></p>',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="alt=&quot;iRuler Express&quot;" src="https://www.blognone.com/sites/default/files/externals/3d24d62491fadc2d60705ad40bda0784.png" layout="responsive" width="281" height="500"></amp-img></div><div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_15061911184757_161880.png" layout="responsive" width="1920" height="1280"></amp-img></div><div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_150619111846MI_161880.png" layout="responsive" width="1920" height="1280"></amp-img></div><div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="iRuler Express" src="http://www.thaiware.com/upload_misc/software/2015_06/images/12085_150619111843Sw_161880.png" layout="responsive" width="1920" height="1280"></amp-img></div><p></p>\n<p>สามารถดาวน์โหลดได้ในระบบ iOS คลิกลิงก์ด้านล่างเพื่อดาวน์โหลดได้ที่ App Store</p>\n<p><a href="https://itunes.apple.com/us/app/iruler-express/id997794197?l=th&amp;ls=1&amp;mt=8"><div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="No Description" src="https://www.blognone.com/sites/default/files/externals/834435d3ead34adddadc7e92dbf1f615.jpg" layout="responsive" width="118" height="40"></amp-img></div></a></p>\n<p><a href="https://itunes.apple.com/us/app/measure-map-pro/id1106880437?l=th&amp;ls=1&amp;mt=8">Dowanload iRuler Express</a></p>\n<p>ท่านสามารถติดตามข่าวสารของแอพพลิเคชันได้ที่</p>\n<p><a href="https://www.facebook.com/pages/Funbook/365509203579475">https://www.facebook.com/pages/Funbook</a></p>',
		],
	])('should convert <img> to <amp-img> correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})

	test.each([
		[
			'<img src="https://httpbin.org/status/200" />',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img src="https://httpbin.org/status/200" layout="responsive" width="1920" height="1280"></amp-img></div>',
		],
		[
			'<img src="https://httpbin.org/status/404" />',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img src="https://httpbin.org/status/404" layout="responsive" width="1920" height="1280"></amp-img></div>',
		],
		[
			'<img src="https://httpbin.org/image/svg" />',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img src="https://httpbin.org/image/svg" layout="responsive" width="100" height="100"></amp-img></div>',
		],
	])('Test edge cases', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})

describe('Convert Facebook to <amp-facebook>', () => {
	test.each([
		[
			'<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fblognone%2Fphotos%2Fa.10150302877481716.327076.12105421715%2F10155371759916716%2F%3Ftype%3D3&amp;width=500" width="500" height="759" scrolling="no" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
			'<div style="max-width: 500px; margin: auto;"><amp-facebook layout="responsive" width="500" height="759" data-embed-as="post" data-href="https://www.facebook.com/blognone/photos/a.10150302877481716.327076.12105421715/10155371759916716/?type=3&amp;width=500"></amp-facebook></div>',
		],
		[
			'<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPerfume.global%2Fposts%2F2409972299027863&width=500" width="500" height="673" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>',
			'<div style="max-width: 500px; margin: auto;"><amp-facebook layout="responsive" width="500" height="673" data-embed-as="post" data-href="https://www.facebook.com/Perfume.global/posts/2409972299027863&amp;width=500"></amp-facebook></div>',
		],
	])('should convert Facebook post correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})

	test.each([
		[
			'<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FSweatSixteen%2Fvideos%2F1491189914350508%2F&show_text=0&width=560" width="560" height="420" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>',
			'<div style="max-width: 560px; margin: auto;"><amp-facebook layout="responsive" width="560" height="420" data-embed-as="video" data-href="https://www.facebook.com/SweatSixteen/videos/1491189914350508/&amp;show_text=0&amp;width=560"></amp-facebook></div>',
		],
		[
			'<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fblognone%2Fvideos%2F523673481441686%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>',
			'<div style="max-width: 560px; margin: auto;"><amp-facebook layout="responsive" width="560" height="315" data-embed-as="video" data-href="https://www.facebook.com/blognone/videos/523673481441686/&amp;show_text=0&amp;width=560"></amp-facebook></div>',
		],
	])('should convert Facebook video correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})

describe('Convert Twitter to <amp-twitter>', () => {
	test.each([
		[
			'<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr" xml:lang="en">Our previous NYE tweet was in poor taste &amp; does not reflect our values. We apologize. We are dedicated to the security of America &amp; allies.</p>\n<p>— US Strategic Command (@US_Stratcom) <a href="https://twitter.com/US_Stratcom/status/1079881433072717824?ref_src=twsrc%5Etfw">December 31, 2018</a></p></blockquote>',
			'<amp-twitter layout="responsive" width="1920" height="1280" data-tweetid="1079881433072717824"></amp-twitter>',
		],
		[
			'<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr" xml:lang="en">Take us down to the Paradise City…Burnout Paradise Remastered arrives on March 16 <a href="https://t.co/HkA8LcZtLe">pic.twitter.com/HkA8LcZtLe</a></p>\n<p>— Electronic Arts (@EA) <a href="https://twitter.com/EA/status/965994467613294592?ref_src=twsrc%5Etfw">February 20, 2018</a></p></blockquote>',
			'<amp-twitter layout="responsive" width="1920" height="1280" data-tweetid="965994467613294592"></amp-twitter>',
		],
		[
			'<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">もう少し続きます！ 織田奈那さんにセレクトしていただいた写真集のアザーカットを大公開（第一弾）です!!  Part09<br><br>【Amazon】<a href="https://t.co/2cjAjgE7Zg">https://t.co/2cjAjgE7Zg</a>    <br>【HMV】<a href="https://t.co/4D3Amyw0lK">https://t.co/4D3Amyw0lK</a>  <br> 【楽天】<a href="https://t.co/6RPf78tGst">https://t.co/6RPf78tGst</a>   <a href="https://twitter.com/hashtag/%E6%AC%85%E5%9D%8246?src=hash&amp;ref_src=twsrc%5Etfw">#欅坂46</a> <a href="https://twitter.com/hashtag/%E5%B0%8F%E6%9E%97%E7%94%B1%E4%BE%9D?src=hash&amp;ref_src=twsrc%5Etfw">#小林由依</a> <a href="https://twitter.com/hashtag/1st%E5%86%99%E7%9C%9F%E9%9B%86?src=hash&amp;ref_src=twsrc%5Etfw">#1st写真集</a> <a href="https://twitter.com/hashtag/%E7%B9%94%E7%94%B0%E5%A5%88%E9%82%A3?src=hash&amp;ref_src=twsrc%5Etfw">#織田奈那</a> <a href="https://twitter.com/hashtag/%E3%81%BD%E3%82%93%E3%81%8B%E3%82%93%E3%81%95%E3%81%A4_%E3%82%86%E3%83%BC%E3%81%91%E3%83%BC?src=hash&amp;ref_src=twsrc%5Etfw">#ぽんかんさつ_ゆーけー</a> <a href="https://t.co/S0eE7lqwzz">pic.twitter.com/S0eE7lqwzz</a></p>&mdash; 小林由依1st写真集「タイトル未定」_公式 (@ponkansatsu_uk) <a href="https://twitter.com/ponkansatsu_uk/status/1086905175338446848?ref_src=twsrc%5Etfw">January 20, 2019</a></blockquote>',
			'<amp-twitter layout="responsive" width="1920" height="1280" data-tweetid="1086905175338446848"></amp-twitter>',
		],
		[
			'<blockquote class="twitter-tweet" lang="en" xml:lang="en"><p>Kobo Aura H2O &amp; The Aqualillies made a splash at yesterday\'s launch event. Ready to read poolside? <a href="https://twitter.com/hashtag/ReadAnywhere?src=hash">#ReadAnywhere</a> <a href="http://t.co/iqIZEa1yVC">pic.twitter.com/iqIZEa1yVC</a></p>\n<p>— Kobo (@kobo) <a href="https://twitter.com/kobo/statuses/504647522376093696">August 27, 2014</a></p></blockquote>',
			'<amp-twitter layout="responsive" width="1920" height="1280" data-tweetid="504647522376093696"></amp-twitter>',
		],
	])('should convert twitter post correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})

describe('Convert YouTube to <amp-youtube>', () => {
	test.each([
		[
			'<iframe width="640" height="360" src="https://www.youtube.com/embed/P5dxd-ocaE8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-youtube layout="responsive" width="640" height="360" data-videoid="P5dxd-ocaE8" style="margin-top: 16px; margin-bottom: 16px;"></amp-youtube></div>',
		],
		[
			'<iframe width="640" height="360" src="https://www.youtube.com/embed/YbJOTdZBX1g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-youtube layout="responsive" width="640" height="360" data-videoid="YbJOTdZBX1g" style="margin-top: 16px; margin-bottom: 16px;"></amp-youtube></div>',
		],
		[
			'<iframe width="560" height="315" src="https://www.youtube.com/embed/QAg9CpiDXGo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
			'<div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-youtube layout="responsive" width="560" height="315" data-videoid="QAg9CpiDXGo" style="margin-top: 16px; margin-bottom: 16px;"></amp-youtube></div>',
		],
	])('should convert youtube video correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})

describe('Convert iframe to <amp-iframe>', () => {
	test.each([
		[
			'<iframe width="640" height="390" src="//www.youtube.com/embed/zBJq0l0v6Qs" frameborder="0" allowfullscreen=""></iframe>',
			'<div style="width: 100%; margin: auto;"><amp-iframe layout="responsive" width="640" height="390" src="https://www.youtube.com/embed/zBJq0l0v6Qs" sandbox="allow-scripts allow-same-origin"><amp-img layout="responsive" alt="loading" placeholder="" src="/assets/loading.gif" width="100" height="100"></amp-img></amp-iframe></div>',
		],
		[
			'<iframe width="640" height="360" src="//www.youtube.com/embed/gOyIA8EK2R0?feature=player_embedded" frameborder="0" allowfullscreen></iframe>',
			'<div style="width: 100%; margin: auto;"><amp-iframe layout="responsive" width="640" height="360" src="https://www.youtube.com/embed/gOyIA8EK2R0?feature=player_embedded" sandbox="allow-scripts allow-same-origin"><amp-img layout="responsive" alt="loading" placeholder="" src="/assets/loading.gif" width="100" height="100"></amp-img></amp-iframe></div>',
		],
		[
			'<p>ศาสตร์การประกอบคอมพิวเตอร์อาจเป็นเรื่องยากสำหรับหลายคน ล่าสุดมีเกมสอนประกอบคอมพิวเตอร์แบบสมจริง ภาพสามมิติ ที่มีงบประมาณให้คุณเลือกฮาร์ดแวร์เข้ามาประกอบใส่แบบภาพสมจริงทั้งเคส เมนบอร์ด การ์ดจอ เปิดให้ดาวน์โหลดช่วง pre-alpha ฟรีครับ ลองเข้าไปเล่นกันได้</p>\n<p>ที่มา - <a href="https://pcbuildingsimulator.wordpress.com/">PC Building Simulator</a></p>\n<p><a href="http://upic.me/show/60485762"><img alt="alt=&quot;upic.me&quot;" src="https://www.blognone.com/sites/default/files/externals/78d2fef8e5cd6471e44ce58b174852f8.jpg" ></a></p>\n<iframe></iframe>',
			'<p>ศาสตร์การประกอบคอมพิวเตอร์อาจเป็นเรื่องยากสำหรับหลายคน ล่าสุดมีเกมสอนประกอบคอมพิวเตอร์แบบสมจริง ภาพสามมิติ ที่มีงบประมาณให้คุณเลือกฮาร์ดแวร์เข้ามาประกอบใส่แบบภาพสมจริงทั้งเคส เมนบอร์ด การ์ดจอ เปิดให้ดาวน์โหลดช่วง pre-alpha ฟรีครับ ลองเข้าไปเล่นกันได้</p>\n<p>ที่มา - <a href="https://pcbuildingsimulator.wordpress.com/">PC Building Simulator</a></p>\n<p><a href="http://upic.me/show/60485762"><div style="width: 100vw; margin: 0 calc(50% - 50vw);"><amp-img alt="alt=&quot;upic.me&quot;" src="https://www.blognone.com/sites/default/files/externals/78d2fef8e5cd6471e44ce58b174852f8.jpg" layout="responsive" width="656" height="526"></amp-img></div></a></p>\n<div></div>',
		],
		[
			'<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.th/maps?f=q&amp;source=s_q&amp;hl=th&amp;geocode=&amp;q=the+third+place&amp;sll=13.0376,101.491373&amp;sspn=6.482843,10.184326&amp;ie=UTF8&amp;ll=13.747055,100.585585&amp;spn=0.003158,0.004973&amp;z=14&amp;iwloc=A&amp;cid=8738395846461579913&amp;output=embed"></iframe>',
			'<div style="width: 100%; margin: auto;"><amp-iframe layout="responsive" width="425" height="350" src="https://maps.google.co.th/maps?f=q&amp;source=s_q&amp;hl=th&amp;geocode=&amp;q=the+third+place&amp;sll=13.0376,101.491373&amp;sspn=6.482843,10.184326&amp;ie=UTF8&amp;ll=13.747055,100.585585&amp;spn=0.003158,0.004973&amp;z=14&amp;iwloc=A&amp;cid=8738395846461579913&amp;output=embed" sandbox="allow-scripts allow-same-origin"><amp-img layout="responsive" alt="loading" placeholder="" src="/assets/loading.gif" width="100" height="100"></amp-img></amp-iframe></div>',
		],
	])('should convert Iframe correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})

describe('Convert instagram to <amp-instagram>', () => {
	test.each([
		[
			'<blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-version="6"><div>\n<div>\n<div></div>\n</div>\n<p> <a href="https://www.instagram.com/p/BDgRuyUMrLj/" target="_blank"></a></p>\n<p>A photo posted by Cris Horwang (@crishorwang) on Mar 28, 2016 at 10:01am PDT</p>\n</div>\n</blockquote>\n',
			'<amp-instagram layout="responsive" width="1920" height="1280" data-shortcode="BDgRuyUMrLj" data-captioned=""></amp-instagram>',
		],
		[
			'<blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-version="6"><div>\n<div>\n<div></div>\n</div>\n<p> <a href="https://www.instagram.com/p/BDgWkpmDlza/" target="_blank">รักนะ....ฝันดีเน้อ!!!!#ฝากร้านได้</a></p>\n<p>A photo posted by โก๊ะตี๋ อารามบอย (@kootee) on Mar 28, 2016 at 10:43am PDT</p>\n</div>\n</blockquote>\n',
			'<amp-instagram layout="responsive" width="1920" height="1280" data-shortcode="BDgWkpmDlza" data-captioned=""></amp-instagram>',
		],
		[
			'<blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-version="6"><div>\n<div>\n<div></div>\n</div>\n<p><a href="https://www.instagram.com/p/BDgLzaEiSG5/" target="_blank">turn me on ด้วยคน #อย่าทิ้งเก๊านะ #ลอกการบ้าน @ploychava ซึ่งลอกการบ้าน @win.twin มาอีกที</a></p>\n<p>A photo posted by Araya Alberta Hargate (@chomismaterialgirl) on Mar 28, 2016 at 9:09am PDT</p>\n</div>\n</blockquote>',
			'<amp-instagram layout="responsive" width="1920" height="1280" data-shortcode="BDgLzaEiSG5" data-captioned=""></amp-instagram>',
		],
	])('should convert Instagram post correctly', async (htmlTag, ampTag) => {
		await expectTransform(htmlTag, ampTag)
	})
})
