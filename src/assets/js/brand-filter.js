export default class BrandFilter {
  constructor() {
    this.brands = new Map();
    this.selectedBrands = new Set();
    this.init();
  }

  init() {
    if (!this.isCategoryPage()) return;

    // Wait for DOM to be ready
    this.waitForProducts().then(() => {
      this.collectBrands();
      this.createBrandFilter();
      this.attachEvents();
    });
  }

  isCategoryPage() {
    return (
      window.location.pathname.includes("/category/") ||
      document.querySelector(".s-products-list")
    );
  }

  waitForProducts() {
    return new Promise((resolve) => {
      if (document.querySelector(".s-products-list-item")) {
        resolve();
      } else {
        const observer = new MutationObserver((mutations, obs) => {
          if (document.querySelector(".s-products-list-item")) {
            obs.disconnect();
            resolve();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });
  }

  collectBrands() {
    this.brands.clear();

    document.querySelectorAll(".s-products-list-item").forEach((product) => {
      const brandName =
        product.dataset.productBrand ||
        product.querySelector(".product-brand")?.textContent?.trim();

      if (brandName) {
        this.brands.set(brandName, (this.brands.get(brandName) || 0) + 1);
      }
    });
  }

  createBrandFilter() {
    const filterSection = document.querySelector(".brand-filter-section");
    if (!filterSection || this.brands.size === 0) return;

    const brandList = filterSection.querySelector(".brand-filter-list");
    if (!brandList) return;

    // Sort brands by count
    const sortedBrands = Array.from(this.brands.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    brandList.innerHTML = sortedBrands
      .map(
        ([brand, count]) => `
      <label class="brand-filter-item flex items-center py-2 hover:text-primary cursor-pointer">
        <input type="checkbox" 
               class="brand-checkbox mr-2" 
               value="${brand}">
        <span class="flex-1">${brand}</span>
        <span class="text-xs text-gray-500">(${count})</span>
      </label>
    `
      )
      .join("");

    this.attachBrandSearch();
  }

  attachBrandSearch() {
    const searchInput = document.getElementById("brand-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      document.querySelectorAll(".brand-filter-item").forEach((item) => {
        const brandName = item.querySelector("span").textContent.toLowerCase();
        item.style.display = brandName.includes(searchTerm) ? "" : "none";
      });
    });
  }

  attachEvents() {
    // Brand checkbox change
    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("brand-checkbox")) {
        this.handleBrandChange(e.target);
      }
    });

    // Clear filters button
    const clearBtn = document.querySelector(".clear-filters");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearAllFilters());
    }
  }

  handleBrandChange(checkbox) {
    const brand = checkbox.value;

    if (checkbox.checked) {
      this.selectedBrands.add(brand);
    } else {
      this.selectedBrands.delete(brand);
    }

    this.filterProducts();
    this.updateClearButton();
  }

  filterProducts() {
    const products = document.querySelectorAll(".s-products-list-item");
    let visibleCount = 0;

    products.forEach((product) => {
      const productBrand =
        product.dataset.productBrand ||
        product.querySelector(".product-brand")?.textContent?.trim();

      const shouldShow =
        this.selectedBrands.size === 0 || this.selectedBrands.has(productBrand);

      product.style.display = shouldShow ? "" : "none";
      if (shouldShow) visibleCount++;
    });

    this.updateProductCount(visibleCount);
  }

  updateProductCount(count) {
    const countElement = document.querySelector(".products-count span span");
    if (countElement) {
      countElement.textContent = count;
    }
  }

  updateClearButton() {
    const clearBtn = document.querySelector(".clear-filters");
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", this.selectedBrands.size === 0);
    }
  }

  clearAllFilters() {
    this.selectedBrands.clear();

    document.querySelectorAll(".brand-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });

    this.filterProducts();
    this.updateClearButton();
  }
}
