export default class CategoryFilters {
  constructor() {
    this.init();
  }

  init() {
    this.attachPriceFilter();
    this.attachRatingFilter();
    this.attachStockFilter();
    this.attachSortingFilter();
    this.attachViewToggle();
    this.attachClearFilters();
  }

  attachPriceFilter() {
    const applyBtn = document.querySelector(".apply-price-filter");
    if (!applyBtn) return;

    applyBtn.addEventListener("click", () => {
      const minPrice =
        parseFloat(document.querySelector(".price-from").value) || 0;
      const maxPrice =
        parseFloat(document.querySelector(".price-to").value) || Infinity;

      this.filterProducts((product) => {
        const price = parseFloat(product.dataset.productPrice);
        return price >= minPrice && price <= maxPrice;
      });
    });
  }

  attachRatingFilter() {
    document.querySelectorAll(".rating-filter").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedRatings = Array.from(
          document.querySelectorAll(".rating-filter:checked")
        ).map((cb) => parseInt(cb.value));

        if (selectedRatings.length === 0) {
          this.showAllProducts();
          return;
        }

        this.filterProducts((product) => {
          const rating = parseFloat(product.dataset.productRating);
          return selectedRatings.some((minRating) => rating >= minRating);
        });
      });
    });
  }

  attachStockFilter() {
    const stockCheckbox = document.querySelector(".in-stock-only");
    if (!stockCheckbox) return;

    stockCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        this.filterProducts((product) => {
          const stockBadge = product.querySelector(".out-of-stock");
          return !stockBadge;
        });
      } else {
        this.showAllProducts();
      }
    });
  }

  attachSortingFilter() {
    const sortSelect = document.querySelector(".sort-products");
    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
      const sortValue = e.target.value;
      const products = Array.from(
        document.querySelectorAll(".s-products-list-item")
      );
      const container = document.querySelector(".s-products-list");

      products.sort((a, b) => {
        switch (sortValue) {
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
              parseFloat(b.dataset.productRating) -
              parseFloat(a.dataset.productRating)
            );
          default:
            return 0;
        }
      });

      products.forEach((product) => container.appendChild(product));
    });
  }

  attachViewToggle() {
    const gridBtn = document.querySelector(".view-grid");
    const listBtn = document.querySelector(".view-list");
    const productsList = document.querySelector(".s-products-list");

    if (!gridBtn || !listBtn) return;

    gridBtn.addEventListener("click", () => {
      productsList.classList.remove("list-view");
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
      productsList.classList.add("list-view");
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
    });
  }

  attachClearFilters() {
    const clearBtn = document.querySelector(".clear-filters");
    if (!clearBtn) return;

    document
      .querySelectorAll('input[type="checkbox"], input[type="number"]')
      .forEach((input) => {
        input.addEventListener("change", () => {
          clearBtn.classList.remove("hidden");
        });
      });

    clearBtn.addEventListener("click", () => {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      document
        .querySelectorAll('input[type="number"]')
        .forEach((input) => (input.value = ""));

      this.showAllProducts();
      clearBtn.classList.add("hidden");
    });
  }

  filterProducts(filterFn) {
    document.querySelectorAll(".s-products-list-item").forEach((product) => {
      product.style.display = filterFn(product) ? "" : "none";
    });
    this.updateProductsCount();
  }

  showAllProducts() {
    document.querySelectorAll(".s-products-list-item").forEach((product) => {
      product.style.display = "";
    });
    this.updateProductsCount();
  }

  updateProductsCount() {
    const visibleProducts = document.querySelectorAll(
      '.s-products-list-item:not([style*="display: none"])'
    ).length;
    const countElement = document.querySelector(".products-count span");

    if (countElement) {
      countElement.textContent = visibleProducts;
    }
  }
}

new CategoryFilters();
