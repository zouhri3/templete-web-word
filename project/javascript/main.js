//  __________________________________ start short code whith function __________________________________
// select elements
const el = (element) => {
    return document.querySelector(element);
  },
  els = (elements) => {
    return document.querySelectorAll(elements);
  };

// add class active to element target and remove to siblings elements
const active_class = (items) => {
  els(items).forEach((element) => {
    element.addEventListener("click", (e) => {
      // chicked if has items default active and  remove class active to
      if (el(items + ".active") != null) {
        el(items + ".active").classList.remove("active");
      }

      // add class active to element target
      e.target.classList.add("active");
    });
  });
};
//  __________________________________ ens short code whith function __________________________________

//  __________________________________ start home_page __________________________________
function home_page() {
  // add class active to nav item target and remove class active to siblings
  active_class("nav .item > a");

  // add class active to outher link chosse and remove class active to siblings
  active_class(".mega_menu .links .list_item a");

  // show || hide all link if target element outher link
  el(".outher_links").addEventListener("click", (e) => {
    e.target.classList.toggle("show");
  });
  els(".mega_menu .links .list_item a").forEach((item) => {
    item.addEventListener("click", (e) => {
      el(".outher_links").classList.toggle("show");
    });
  });
}
home_page();

//  __________________________________ end home_page __________________________________
//  __________________________________ start skills_page __________________________________
function skills_page() {
  els("#skills .progress").forEach((element) => {
    // create paragraph elements
    const para = document.createElement("p");

    // append elment para to elements progress info
    element.previousElementSibling.appendChild(para);

    // add content para
    para.textContent = element.dataset.pourcentage;
  });
}
skills_page();

// skills animation
const animation_skills = (option) => {
  els("#skills .progress").forEach((element) => {
    // span width
    if (option == true) {
      element.firstElementChild.style.width = `${element.dataset.pourcentage}`;
    } else {
      element.firstElementChild.style.width = `0`;
    }
  });
};
//  __________________________________ end skills_page __________________________________
// ______________________________________ start events_page ________________________________
const events_page = () => {
  let num_days = 30,
    num_hours = 0;
  num_minutes = 0;
  num_secondes = 0;

  // set content to all items
  const counter_date = () => {
    el("#days span:first-child").textContent = num_days;
    el("#hours span:first-child").textContent = num_hours;
    el("#minutes span:first-child").textContent = num_minutes;
    el("#seconds span:first-child").textContent = num_secondes;

    // checked id length is one
    els(".box_date span:first-child").forEach((item) => {
      if (item.textContent.length == 1) {
        const value_items = item.textContent;
        item.textContent = `0${value_items}`;
      }
    });
  };

  // counter_time change content daynamique white time
  const counter_time = setInterval(() => {
    num_secondes--;
    if (num_secondes <= 0) {
      num_secondes = 59;
      num_minutes--;
      if (num_minutes <= 0) {
        num_minutes = 59;
        num_hours--;
        if (num_hours < 0) {
          num_hours = 23;
          num_days--;
          if (num_days < 0) {
            num_days = "--";
            num_hours = "--";
            num_minutes = "--";
            num_secondes = "--";
            clearInterval(counter_time);
          }
        }
      }
    }
    counter_date();
  }, 1000);
};
events_page();

// ______________________________________ end events_page ________________________________
//  __________________________________ start videos_page __________________________________
const videos_page = () => {
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLDoPjvoNmBAzlpyFHOaB3b-eubmF0TAV2&maxResults=19&key=AIzaSyDo1BoNwTyXy331_QS6mGChJXNeapWQPEs`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.items.forEach((item, index) => {
        const title = item.snippet.title,
          videosID = item.snippet.resourceId.videoId;

        // create my list videos
        const list_videos = document.createElement("p");

        // craete id to list_videos
        list_videos.id = "item_videos";

        // add content to my list_videos
        list_videos.textContent = title.substring(title.indexOf("#"));
        // create data attribute in my list_videos
        list_videos.dataset.videos_id = videosID;

        // append list_videos to my list_vidoes
        el(".videos .content .videos_box.list_vidoes").appendChild(list_videos);
      });
    });

  // add event lisner if choose item_videos show him in vidoes player
  el(".videos_box.list_vidoes").addEventListener("click", (e) => {
    if (e.target.id == "item_videos") {
      el(
        "#player"
      ).src = `https://www.youtube.com/embed/${e.target.dataset.videos_id}`;
    }

    // add class active to item vidoes choose and remove to siblings
    active_class(".videos_box.list_vidoes #item_videos");
  });
  // make good height to my player
  el("#player").style.height =
    el("#player").getBoundingClientRect().width * 0.5625 + "px";
};

videos_page();

//  __________________________________ end videos_page __________________________________
// ______________________________________ start statistics_page ________________________________
const statistics_page = (order) => {
  els(".statistics .content .statistics_box  h3").forEach((item) => {
    // to do counter
    const time = 2000 / item.dataset.value;
    if (order) {
      const counter = setInterval(() => {
        item.textContent == item.dataset.value
          ? clearInterval(counter)
          : item.textContent++;
      }, time);
    } else {
      setTimeout(() => {
        item.textContent = "0";
      }, time + 100);
    }
  });
};
// ______________________________________ end statistics_page ________________________________
//  __________________________________ start footer_page __________________________________
const footer_page = () => {
  // start logic to change  thems
  els("footer  .footer_box .thems span").forEach((item, index) => {
    item.addEventListener("click", () => {
      // add class dark to body or remove him at condition
      item.dataset.them == "dark"
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");

      // add index item choose in local storage
      localStorage.setItem("thems_mode", index);

      //add class active to my option choose and remove to auther option
      active_class("footer  .footer_box .thems span");
    });

    // cheked if has option choose in local storage and cliked to items choosing
    if (localStorage.getItem("thems_mode") != null) {
      els("footer  .footer_box .thems span")[
        +localStorage.getItem("thems_mode")
      ].click();
    }
  });

  // change language
  els("footer  .footer_box .language span").forEach((item) => {
    item.addEventListener("click", () => {
      // change param at fonction change_lang and direction to body
      if (item.dataset.lang == "english") {
        // option chose to local storage
        localStorage.setItem("option_lang", "json_en");
      } else {
        // option chose to local storage
        localStorage.setItem("option_lang", "json_ar");
      }
      window.location.reload();
      //add class active to my option choose and remove to auther option
    });

    // add class active to lang chosse
    if (localStorage.getItem("option_lang") == "json_ar") {
      els("footer  .footer_box .language span")[0].classList.add("active");
      els("footer  .footer_box .language span")[1].classList.remove("active");
    } else {
      els("footer  .footer_box .language span")[0].classList.remove("active");
      els("footer  .footer_box .language span")[1].classList.add("active");
    }
  });
};
footer_page();
//  __________________________________ end footer_page __________________________________
//  __________________________________ start connection the link nav-bar with section on event scroll __________________________________
const height_header = el("header").offsetHeight + 2;
window.addEventListener("scroll", () => {
  els(".section").forEach((section) => {
    let top = section.offsetTop,
      sv = top + section.offsetHeight;
    if (el("header").classList.contains("fixed")) {
      top -= height_header;
    }
    if (top <= window.scrollY) {
      if (window.scrollY < sv) {
        if (section.classList.contains("outher_lin")) {
          // if section on screen  in outher_link
          //remove class active to silblings  outher_links
          el("nav .item > a.active").classList.remove("active");

          //add class active to  element outher_links
          el(`nav .item .outher_links`).classList.add("active");

          //if have class active to mega_menu items remove him
          if (el(".mega_menu .links .active") != null) {
            el(".mega_menu .links .active").classList.remove("active");
          }

          //  checked link mega_menu as go to section on screen and add class active
          el(`.mega_menu .links [href="#${section.id}"]`).classList.add(
            "active"
          );

          // animation skills
          section.id == "skills"
            ? animation_skills(true)
            : animation_skills(false);

          //counter in statistics
          section.id == "statistics"
            ? statistics_page(true)
            : statistics_page(false);
        } else {
          // if section on screen not in outher_link
          //remove class active outher_links
          el("nav .item > a.active").classList.remove("active");

          //  checked  link navbar as go to section on screen and add class active
          el(`nav .item > a[href="#${section.id}"]`).classList.add("active");

          //if have class active to mega_menu items remove him
          if (el(".mega_menu .links a.active") != null) {
            el(".mega_menu .links .active").classList.remove("active");
          }
        }
        // animation special heading
        if (el("body > .active") != null) {
          el("body > .active").classList.remove("active");
        }
        section.classList.add("active");
      }
    }
  });
});
//  __________________________________ end connection the link nav-bar with section on event scroll __________________________________
// ___________________________________ start change langue ___________________________________
const change_lang = (lang) => {
  fetch(`./json/${lang ?? "json_en"}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //body direction
      document.body.dir = data.dir;

      //  __________________________________ start home-page __________________________________

      //-------------- for header --------------
      // direct child of nav
      data.home["nav"][0].forEach((item, index) => {
        els("header nav .item>a")[index].textContent = item;
      });

      // for outher link
      data.home["nav"][1]["Outher Links"].forEach((item, index) => {
        els(".mega_menu .links li.list_item a")[index].textContent = item;
      });

      // ----------- for  landing --------------
      // title home
      el(".home .landing .container .text h1").textContent =
        data.home.landing.h1;
      //description home
      el(".home .landing .container .text p").textContent =
        data.home.landing.desc;
      //  __________________________________ end home-page __________________________________
      //  __________________________________ start aticle-page __________________________________
      // header special
      el(".article .special_heading").textContent = data.aticle.h2;

      // article_box
      data.aticle.article_box.forEach((item, index) => {
        els(".article .content .article_box h3")[index].textContent = item.h3;
        els(".article .content .article_box p")[index].textContent = item.desc;
        els(".article .content .article_box a span")[index].textContent =
          item.link;
        els(".article .content .article_box a i")[index].classList = item.icon;
      });

      //  __________________________________ end aticle-page __________________________________
      //  __________________________________ start gallery-page __________________________________
      // header special
      el(".gallery .special_heading").textContent = data.gallery.h2;
      //  __________________________________ end gallery-page __________________________________
      //  __________________________________ start feature-page __________________________________
      // header special
      el(".feature .special_heading").textContent = data.feature.h2;

      // feature_box
      data.feature.feature_box.forEach((item, index) => {
        els(".feature .content .feature_box h3")[index].textContent = item.h3;
        els(".feature .content .feature_box p")[index].textContent = item.desc;
        els(".feature .content .feature_box a")[index].textContent = item.link;
      });
      //  __________________________________ end feature-page __________________________________
      //  __________________________________ start testimonials-page __________________________________
      // header special
      el(".testimonials  .special_heading").textContent = data.testimonials.h2;
      // testimonials_box
      data.testimonials.testimonials_box.forEach((item, index) => {
        els(".testimonials .content .testimonials_box h3")[index].textContent =
          item.h3;
        els(".testimonials .content .testimonials_box .job p")[
          index
        ].textContent = item.jobs;
        els(".testimonials .content .testimonials_box >p sup i")[
          index
        ].classList = item.icon_sup;
        els(".testimonials .content .testimonials_box >p span")[
          index
        ].textContent = item.desc;
        els(".testimonials .content .testimonials_box >p sub i")[
          index
        ].classList = item.icon_sub;
      });
      //  __________________________________ end testimonials-page __________________________________
      //  __________________________________ start teams-page __________________________________
      // header special
      el(".teams .special_heading").textContent = data.teams.h2;

      // teams_box
      data.teams.teams_box.forEach((item, index) => {
        els(".teams .content .teams_box h3")[index].textContent = item.h3;
        els(".teams .content .teams_box >p")[index].textContent = item.jobs;
      });

      //  __________________________________ end teams-page __________________________________
      //  __________________________________ start SERVICES-page __________________________________
      // header special
      el(".services .special_heading").textContent = data.services.h2;

      // services_box
      data.services.services_box.forEach((item, index) => {
        els(".services .content .services_box .box h3")[index].textContent =
          item.h3;
        els(".services .content .services_box .box_bottom a")[
          index
        ].textContent = item.link;
      });
      //  __________________________________ end SERVICES-page __________________________________
      //  __________________________________ start skills-page __________________________________
      // header special
      el(".skills .special_heading").textContent = data.skills.h2;
      //  __________________________________ end skills-page __________________________________
      //  __________________________________ start works-page __________________________________
      // header special
      el(".works .special_heading").textContent = data.works.h2;

      // works_box
      data.works.works_box.forEach((item, index) => {
        els(".works .content .works_box .box h3")[index].textContent = item.h3;
        els(".works .content .works_box .box p")[index].textContent = item.desc;
      });
      //  __________________________________ end works-page __________________________________
      //  __________________________________ start events-page __________________________________
      // header special
      el(".events .special_heading").textContent = data.events.h2;

      // events_box
      el(".events .content .events_box h3").textContent =
        data.events.events_box.h3;

      el(".events .content .events_box .content_box p").textContent =
        data.events.events_box.desc;

      data.events.events_box.box_date.forEach((item, index) => {
        els(".events .content .events_box .box_date p span:last-child")[
          index
        ].textContent = item;
      });
      //  __________________________________ end events-page __________________________________
      //  __________________________________ start pricing-page __________________________________
      // header special
      el(".pricing .special_heading").textContent = data.pricing.h2;

      //pricing_box
      data.pricing.pricing_box.forEach((item, index) => {
        els(".pricing .content .pricing_box h3")[index].textContent = item.h3;

        els(".pricing .content .pricing_box .type_box p span:last-child")[
          index
        ].textContent = item.time;

        // option_box
        item.option_box.forEach((item, i) => {
          els(".pricing .content .pricing_box")[index].querySelectorAll(
            ".option_box p span"
          )[i].textContent = item;
        });

        els(".pricing .content .pricing_box button")[index].textContent =
          item.btn;
      });

      //  __________________________________ end pricing-page __________________________________
      //  __________________________________ start videos-page __________________________________
      // header special
      el(".videos .special_heading").textContent = data.videos.h2;
      //  __________________________________ end videos-page __________________________________
      //  __________________________________ start statistics-page __________________________________
      // header special
      el(".statistics .special_heading").textContent = data.statistics.h2;

      //statistics_box
      data.statistics.statistics_box.forEach((item, index) => {
        els(".statistics .content .statistics_box p")[index].textContent = item;
      });
      //  __________________________________ end statistics-page __________________________________
      //  __________________________________ start discount-page __________________________________
      // header discount
      data.discount.h2.forEach((item, index) => {
        els(".discount .discount_box h2")[index].textContent = item;
      });

      // description of discount
      el(".discount .discount_box:first-child p").textContent =
        data.discount.discount_box_one;
      //  __________________________________ end discount-page __________________________________
      //  __________________________________ start footer-page __________________________________
      // footer_box_one
      el("footer .container .footer_box:first-child p").textContent =
        data.footer.footer_box_one;

      // footer_box_two
      data.footer.footer_box_tow.forEach((item, index) => {
        els("footer .footer_box:nth-of-type(2) h3")[index].textContent =
          item.h3;
        item.option.forEach((item, i) => {
          els("footer .footer_box:nth-of-type(2) p")[index].querySelectorAll(
            "span"
          )[i].textContent = item;
        });
      });

      // footer_box_three
      els("footer .container .footer_box address p")[0].textContent =
        data.footer.footer_box_three.address;

      els("footer .container .footer_box address p")[1].textContent =
        data.footer.footer_box_three.plan;
      //  __________________________________ end footer-page __________________________________
    });
};
change_lang(localStorage.getItem("option_lang"));
// ___________________________________ end change langue ___________________________________
