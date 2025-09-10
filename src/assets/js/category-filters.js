export default class CategoryFilters {
  constructor() {
    this.filters = {
      brands: new Set(),
      priceRange: { min: 0, max: Infinity },
      ratings: new Set(),
      inStockOnly: false,
      sortBy: "",
    };

    this.init();
  }

  init() {
    if (!this.isCategoryPage()) return;

    this.attachEvents();
    this.initializePriceRange();
    this.initializeFiltersFromURL();
  }

  isCategoryPage() {
    return (
      window.location.pathname.includes("/category/") ||
      document.querySelector(".s-products-list")
    );
  }

  attachEvents() {
    // Price filter
    this.attachPriceFilter();

    // Rating filter
    this.attachRatingFilter();

    // Stock filter
    this.attachStockFilter();

    // Sorting
    this.attachSortingFilter();

    // View toggle
    this.attachViewToggle();

    // Clear filters
    this.attachClearFilters();
  }

  initializePriceRange() {
    const products = document.querySelectorAll(".s-products-list-item");
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach((product) => {
      const price = parseFloat(product.dataset.productPrice);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;
    });

    // Set placeholder values
    const priceFromInput = document.querySelector(".price-from");
    const priceToInput = document.querySelector(".price-to");

    if (priceFromInput && priceToInput) {
      priceFromInput.placeholder = `من ${Math.floor(minPrice)}`;
      priceToInput.placeholder = `إلى ${Math.ceil(maxPrice)}`;
    }
  }

  initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    // Price range
    if (urlParams.has("min_price")) {
      document.querySelector(".price-from").value = urlParams.get("min_price");
    }
    if (urlParams.has("max_price")) {
      document.querySelector(".price-to").value = urlParams.get("max_price");
    }

    // Apply filters if any exist in URL
    if (urlParams.toString()) {
      this.applyAllFilters();
    }
  }

  attachPriceFilter() {
    const applyBtn = document.querySelector(".apply-price-filter");
    if (!applyBtn) return;

    applyBtn.addEventListener("click", () => {
      const minPrice =
        parseFloat(document.querySelector(".price-from").value) || 0;
      const maxPrice =
        parseFloat(document.querySelector(".price-to").value) || Infinity;

      this.filters.priceRange = { min: minPrice, max: maxPrice };
      this.applyAllFilters();
      this.updateURL();
    });

    // Apply on Enter key
    ["price-from", "price-to"].forEach((className) => {
      const input = document.querySelector(`.${className}`);
      input?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") applyBtn.click();
      });
    });
  }

  attachRatingFilter() {
    document.querySelectorAll(".rating-filter").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const rating = parseInt(checkbox.value);

        if (checkbox.checked) {
          this.filters.ratings.add(rating);
        } else {
          this.filters.ratings.delete(rating);
        }

        this.applyAllFilters();
      });
    });
  }

  attachStockFilter() {
    const stockCheckbox = document.querySelector(".in-stock-only");
    if (!stockCheckbox) return;

    stockCheckbox.addEventListener("change", (e) => {
      this.filters.inStockOnly = e.target.checked;
      this.applyAllFilters();
    });
  }

  attachSortingFilter() {
    const sortSelect = document.querySelector(".sort-products");
    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
      this.filters.sortBy = e.target.value;
      this.sortProducts();
      this.updateURL();
    });
  }

  attachViewToggle() {
    const gridBtn = document.querySelector(".view-grid");
    const listBtn = document.querySelector(".view-list");
    const productsList = document.querySelector(".s-products-list");

    if (!gridBtn || !listBtn || !productsList) return;

    // Load saved view preference
    const savedView = localStorage.getItem("products_view_mode") || "grid";
    if (savedView === "list") {
      productsList.classList.add("list-view");
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    }

    gridBtn.addEventListener("click", () => {
      productsList.classList.remove("list-view");
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
      localStorage.setItem("products_view_mode", "grid");
    });

    listBtn.addEventListener("click", () => {
      productsList.classList.add("list-view");
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
      localStorage.setItem("products_view_mode", "list");
    });
  }

  attachClearFilters() {
    const clearBtn = document.querySelector(".clear-filters");
    if (!clearBtn) return;

    // Monitor all filter changes
    document.querySelectorAll(".filters-container input").forEach((input) => {
      input.addEventListener("change", () => {
        clearBtn.classList.remove("hidden");
      });
    });

    clearBtn.addEventListener("click", () => {
      // Clear all filters
      this.filters = {
        brands: new Set(),
        priceRange: { min: 0, max: Infinity },
        ratings: new Set(),
        inStockOnly: false,
        sortBy: "",
      };

      // Reset UI
      document
        .querySelectorAll('.filters-container input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));

      document
        .querySelectorAll('.filters-container input[type="number"]')
        .forEach((input) => (input.value = ""));

      document.querySelector(".sort-products").value = "";

      // Apply changes
      this.showAllProducts();
      clearBtn.classList.add("hidden");
      this.updateURL();
    });
  }

  applyAllFilters() {
    const products = document.querySelectorAll(".s-products-list-item");
    let visibleCount = 0;

    products.forEach((product) => {
      const shouldShow = this.shouldShowProduct(product);
      product.style.display = shouldShow ? "" : "none";
      if (shouldShow) visibleCount++;
    });

    this.updateProductsCount(visibleCount);
    this.updateClearButton();
  }

  shouldShowProduct(product) {
    // Price filter
    const price = parseFloat(product.dataset.productPrice);
    if (
      price < this.filters.priceRange.min ||
      price > this.filters.priceRange.max
    ) {
      return false;
    }

    // Rating filter
    if (this.filters.ratings.size > 0) {
      const rating = parseFloat(product.dataset.productRating) || 0;
      let matchesRating = false;

      this.filters.ratings.forEach((minRating) => {
        if (rating >= minRating) matchesRating = true;
      });

      if (!matchesRating) return false;
    }

    // Stock filter
    if (this.filters.inStockOnly) {
      const outOfStock =
        product.querySelector(".out-of-stock") ||
        product.querySelector("[data-out-of-stock='true']");
      if (outOfStock) return false;
    }

    return true;
  }

  sortProducts() {
    const container = document.querySelector(".s-products-list");
    const products = Array.from(
      document.querySelectorAll(".s-products-list-item")
    );

    products.sort((a, b) => {
      switch (this.filters.sortBy) {
        case "price-asc":
          return (
            parseFloat(a.dataset.productPrice) -
            parseFloat(b.dataset.productPrice)
          );

        case "price-desc":
          return (
            parseFloat(b.dataset.productPrice) -
            parseFloat(a.dataset.productPrice)
          );

        case "rating":
          return (
            (parseFloat(b.dataset.productRating) || 0) -
            (parseFloat(a.dataset.productRating) || 0)
          );

        case "newest":
          return (b.dataset.productId || 0) - (a.dataset.productId || 0);

        case "bestseller":
          // Assuming we have sold count data
          return (
            (parseInt(b.dataset.productSold) || 0) -
            (parseInt(a.dataset.productSold) || 0)
          );

        default:
          return 0;
      }
    });

    // Re-append sorted products
    products.forEach((product) => container.appendChild(product));
  }

  showAllProducts() {
    document.querySelectorAll(".s-products-list-item").forEach((product) => {
      product.style.display = "";
    });
    this.updateProductsCount();
  }

  updateProductsCount(count) {
    const countElement = document.querySelector(".products-count span span");
    if (countElement) {
      countElement.textContent =
        count !== undefined
          ? count
          : document.querySelectorAll(
              '.s-products-list-item:not([style*="display: none"])'
            ).length;
    }
  }

  updateClearButton() {
    const clearBtn = document.querySelector(".clear-filters");
    if (!clearBtn) return;

    const hasActiveFilters =
      this.filters.brands.size > 0 ||
      this.filters.ratings.size > 0 ||
      this.filters.priceRange.min > 0 ||
      this.filters.priceRange.max < Infinity ||
      this.filters.inStockOnly ||
      this.filters.sortBy;

    clearBtn.classList.toggle("hidden", !hasActiveFilters);
  }

  updateURL() {
    const params = new URLSearchParams();

    if (this.filters.priceRange.min > 0) {
      params.set("min_price", this.filters.priceRange.min);
    }

    if (this.filters.priceRange.max < Infinity) {
      params.set("max_price", this.filters.priceRange.max);
    }

    if (this.filters.sortBy) {
      params.set("sort", this.filters.sortBy);
    }

    // Update URL without reloading
    const newURL = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newURL);
  }
}
