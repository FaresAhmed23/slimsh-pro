import "lite-youtube-embed";
import BasePage from "./base-page";
import Fslightbox from "fslightbox";
window.fslightbox = Fslightbox;
import { zoom } from "./partials/image-zoom";

class Product extends BasePage {
  onReady() {
    app.watchElements({
      totalPrice: ".total-price",
      beforePrice: ".before-price",
      startingPriceTitle: ".starting-price-title",
    });

    this.initProductOptionValidations();

    if (imageZoom) {
      // call the function when the page is ready
      this.initImagesZooming();
      // listen to screen resizing
      window.addEventListener("resize", () => this.initImagesZooming());
    }

    // Initialize enhanced features
    this.initProductViewCounter();
    this.initPurchaseNotifications();
    this.trackProductView();
    this.initSocialProof();
  }

  initProductOptionValidations() {
    document
      .querySelector(".product-form")
      ?.addEventListener("change", function () {
        this.reportValidity() && salla.product.getPrice(new FormData(this));
      });
  }

  initImagesZooming() {
    // skip if the screen is not desktop or if glass magnifier
    // is already crated for the image before
    const imageZoom = document.querySelector(
      ".image-slider .magnify-wrapper.swiper-slide-active .img-magnifier-glass"
    );
    if (window.innerWidth < 1024 || imageZoom) return;
    setTimeout(() => {
      // set delay after the resizing is done, start creating the glass
      // to create the glass in the proper position
      const image = document.querySelector(
        ".image-slider .swiper-slide-active img"
      );
      zoom(image?.id, 2);
    }, 250);

    document
      .querySelector("salla-slider.details-slider")
      .addEventListener("slideChange", (e) => {
        // set delay till the active class is ready
        setTimeout(() => {
          const imageZoom = document.querySelector(
            ".image-slider .swiper-slide-active .img-magnifier-glass"
          );

          // if the zoom glass is already created skip
          if (window.innerWidth < 1024 || imageZoom) return;
          const image = document.querySelector(
            ".image-slider .magnify-wrapper.swiper-slide-active img"
          );
          zoom(image?.id, 2);
        }, 250);
      });
  }

  initProductViewCounter() {
    // Update viewer count periodically
    const updateViewerCount = () => {
      const viewerElements = document.querySelectorAll(".current-viewers");
      const purchaseCountElements =
        document.querySelectorAll(".purchase-count");
      const minViewers = 15;
      const maxViewers = 55;

      viewerElements.forEach((element) => {
        const currentCount = parseInt(element.textContent) || minViewers;
        const change = Math.random() > 0.5 ? 1 : -1;
        let newCount = currentCount + change * Math.floor(Math.random() * 5);

        // Keep within bounds
        newCount = Math.max(minViewers, Math.min(maxViewers, newCount));

        // Animate the change
        app.anime(element, {
          textContent: [currentCount, newCount],
          round: 1,
          duration: 1000,
        });
      });

      // Update purchase count
      purchaseCountElements.forEach((element) => {
        const currentCount = parseInt(element.textContent) || 50;
        const increment = Math.floor(Math.random() * 3);
        element.textContent = currentCount + increment;
      });
    };

    // Initial update after 2 seconds
    setTimeout(updateViewerCount, 2000);

    // Update every 10-20 seconds
    setInterval(updateViewerCount, Math.random() * 10000 + 10000);

    // Show viewer popup periodically
    this.showViewerPopup();
  }

  showViewerPopup() {
    const popup = document.getElementById("product-views-popup");
    if (!popup) return;

    const showPopup = () => {
      const viewerCount = Math.floor(Math.random() * 20) + 15;
      popup.querySelector(".viewer-count").textContent = viewerCount;

      popup.classList.remove("hidden");
      app.anime(popup, {
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutExpo",
      });

      // Hide after 5 seconds
      setTimeout(() => {
        app.anime(popup, {
          translateY: [0, 100],
          opacity: [1, 0],
          duration: 500,
          easing: "easeInExpo",
          complete: () => popup.classList.add("hidden"),
        });
      }, 5000);
    };

    // Show first popup after 3-7 seconds
    setTimeout(showPopup, Math.random() * 4000 + 3000);

    // Show again every 30-60 seconds
    setInterval(showPopup, Math.random() * 30000 + 30000);
  }

  initPurchaseNotifications() {
    const notifications = [
      { name: "أحمد من الرياض", time: "منذ 5 دقائق" },
      { name: "فاطمة من جدة", time: "منذ 12 دقيقة" },
      { name: "محمد من الدمام", time: "منذ 18 دقيقة" },
      { name: "نورة من مكة", time: "منذ 25 دقيقة" },
      { name: "خالد من المدينة", time: "منذ 32 دقيقة" },
      { name: "مريم من الخبر", time: "منذ 45 دقيقة" },
    ];

    let index = 0;

    const showNotification = () => {
      const notification = notifications[index % notifications.length];
      index++;

      // Create notification element
      const notificationEl = document.createElement("div");
      notificationEl.className =
        "fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50 max-w-xs hidden";
      notificationEl.innerHTML = `
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="flex-shrink-0 bg-green-100 rounded-full p-2">
                        <i class="sicon-shopping-bag text-green-600"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">${notification.name}</p>
                        <p class="text-xs text-gray-500">اشترى هذا المنتج ${notification.time}</p>
                    </div>
                </div>
            `;

      document.body.appendChild(notificationEl);

      // Animate in
      setTimeout(() => {
        notificationEl.classList.remove("hidden");
        app.anime(notificationEl, {
          translateX: [100, 0],
          opacity: [0, 1],
          duration: 500,
          easing: "easeOutExpo",
        });
      }, 100);

      // Remove after 4 seconds
      setTimeout(() => {
        app.anime(notificationEl, {
          translateX: [0, 100],
          opacity: [1, 0],
          duration: 500,
          easing: "easeInExpo",
          complete: () => notificationEl.remove(),
        });
      }, 4000);
    };

    // Start showing notifications after 10 seconds
    setTimeout(() => {
      showNotification();
      // Show every 20-40 seconds
      setInterval(showNotification, Math.random() * 20000 + 20000);
    }, 10000);
  }

  trackProductView() {
    // Dispatch event for recently viewed tracking
    if (window.productData) {
      document.dispatchEvent(
        new CustomEvent("salla:product.fetched", {
          detail: window.productData,
        })
      );
    }
  }

  initSocialProof() {
    // Add urgency indicators
    const addUrgencyBadge = () => {
      const priceWrapper = document.querySelector(".price-wrapper");
      if (!priceWrapper || document.querySelector(".urgency-badge")) return;

      const urgencyBadge = document.createElement("div");
      urgencyBadge.className =
        "urgency-badge bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium mt-2 inline-flex items-center";
      urgencyBadge.innerHTML = `
                <i class="sicon-timer ml-1 animate-pulse"></i>
                العرض ينتهي خلال <strong class="mx-1">3</strong> ساعات
            `;

      priceWrapper.appendChild(urgencyBadge);

      // Update timer
      setInterval(() => {
        const timerEl = urgencyBadge.querySelector("strong");
        let hours = parseInt(timerEl.textContent);
        if (hours > 1) {
          timerEl.textContent = hours - 1;
        }
      }, 3600000); // Update every hour
    };

    // Add stock indicator
    const addStockIndicator = () => {
      const quantitySection = document.querySelector(
        ".sticky-product-bar__quantity"
      );
      if (!quantitySection || document.querySelector(".stock-indicator"))
        return;

      const stockIndicator = document.createElement("div");
      stockIndicator.className = "stock-indicator text-xs text-orange-600 mt-2";
      stockIndicator.innerHTML = `
                <i class="sicon-info-circle ml-1"></i>
                بقي <strong>7</strong> قطع فقط - اطلب الآن!
            `;

      quantitySection.appendChild(stockIndicator);
    };

    // Initialize after a short delay
    setTimeout(() => {
      addUrgencyBadge();
      addStockIndicator();
    }, 1500);
  }

  registerEvents() {
    salla.event.on("product::price.updated.failed", () => {
      app.element(".price-wrapper").classList.add("hidden");
      app.element(".out-of-stock").classList.remove("hidden");
      app.anime(".out-of-stock", { scale: [0.88, 1] });
    });

    salla.product.event.onPriceUpdated((res) => {
      app.element(".out-of-stock").classList.add("hidden");
      app.element(".price-wrapper").classList.remove("hidden");

      let data = res.data,
        is_on_sale = data.has_sale_price && data.regular_price > data.price;

      app.startingPriceTitle?.classList.add("hidden");

      app.totalPrice.forEach((el) => {
        el.innerHTML = salla.money(data.price);
      });
      app.beforePrice.forEach((el) => {
        el.innerHTML = salla.money(data.regular_price);
      });

      app.toggleClassIf(
        ".price_is_on_sale",
        "showed",
        "hidden",
        () => is_on_sale
      );
      app.toggleClassIf(
        ".starting-or-normal-price",
        "hidden",
        "showed",
        () => is_on_sale
      );

      app.anime(".total-price", { scale: [0.88, 1] });
    });

    app.onClick(
      "#btn-show-more",
      (e) =>
        app.all("#more-content", (div) => {
          e.target.classList.add("is-expanded");
          div.style = `max-height:${div.scrollHeight}px`;
        }) || e.target.remove()
    );

    // Listen for cart events
    salla.cart.event.onItemAdded((response) => {
      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg z-50";
      notification.innerHTML = `
                <div class="flex items-center">
                    <i class="sicon-check-circle2 text-xl ml-2"></i>
                    تمت إضافة المنتج للسلة بنجاح
                </div>
            `;

      document.body.appendChild(notification);

      setTimeout(() => {
        app.anime(notification, {
          opacity: [1, 0],
          translateY: [0, -20],
          duration: 500,
          complete: () => notification.remove(),
        });
      }, 3000);
    });
  }
}

Product.initiateWhenReady(["product.single"]);
