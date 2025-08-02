# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

====================
Mô tả Dự án
Dự án này sẽ mô phỏng một hệ thống quản lý kho hàng đơn giản, cho phép người dùng thực hiện các tác vụ cơ bản như:

Xem danh sách sản phẩm: Hiển thị tất cả các sản phẩm có trong kho với các thông tin chi tiết (tên, mô tả, số lượng, giá, danh mục).

Thêm sản phẩm mới: Cho phép người dùng thêm một sản phẩm mới vào kho.

Chỉnh sửa thông tin sản phẩm: Cập nhật thông tin của một sản phẩm hiện có.

Xóa sản phẩm: Xóa một sản phẩm khỏi kho.

Tìm kiếm/Lọc sản phẩm: Tìm kiếm sản phẩm theo tên hoặc lọc theo danh mục.

Quản lý danh mục sản phẩm: Xem, thêm, sửa, xóa các danh mục.

Mục tiêu Học tập
Qua dự án này, các bạn sẽ được thực hành:

Xây dựng cấu trúc thư mục ứng dụng React theo hướng Solid.

Sử dụng React Hooks (useState, useEffect, useContext, useRef, useReducer, custom hooks).

Quản lý state của ứng dụng một cách hiệu quả.

Tương tác với API backend (sử dụng fetch API hoặc Axios).

Thiết kế giao diện người dùng thân thiện (sử dụng CSS modules, Styled Components hoặc Tailwind CSS).

Xử lý form và validation.

Áp dụng các nguyên tắc Solid trong thiết kế frontend.

Hiểu rõ luồng dữ liệu giữa frontend và backend.

Cấu trúc Ứng dụng Frontend (React - Theo Nguyên tắc SOLID)
Để áp dụng các nguyên tắc SOLID, chúng ta sẽ tổ chức cấu trúc thư mục của ứng dụng React một cách có hệ thống, tách biệt rõ ràng các trách nhiệm.

src/
├── assets/                  # Ảnh, icon, font
├── components/              # Các UI components tái sử dụng (stateless/dumb components)
│   ├── common/              # Các components chung, ví dụ: Button, Input, Modal, Table
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.module.css
│   │   └── ...
│   ├── ProductCard/         # Component hiển thị thông tin sản phẩm
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.module.css
│   └── CategoryTag/         # Component hiển thị tag danh mục
│       ├── CategoryTag.jsx
│       └── CategoryTag.module.css
├── contexts/                # Quản lý global state (S - Single Responsibility, I - Interface Segregation)
│   ├── ProductContext.jsx   # Context cho dữ liệu sản phẩm
│   └── CategoryContext.jsx  # Context cho dữ liệu danh mục
├── hooks/                   # Các custom hooks (R - Reusable, Open/Closed Principle - O, Single Responsibility - S)
│   ├── useProducts.js       # Hook để fetch và quản lý state sản phẩm
│   ├── useCategories.js     # Hook để fetch và quản lý state danh mục
│   ├── useForm.js           # Hook chung cho việc quản lý form input
│   └── ...
├── layout/                  # Cấu trúc bố cục trang (Header, Footer, Sidebar, MainContent)
│   ├── AppLayout.jsx
│   └── Header.jsx
│   └── Sidebar.jsx
├── pages/                   # Các trang chính của ứng dụng (views/containers)
│   ├── HomePage.jsx         # Trang chủ
│   ├── ProductsPage/        # Trang quản lý sản phẩm
│   │   ├── ProductsPage.jsx
│   │   ├── ProductList.jsx  # Component hiển thị danh sách sản phẩm
│   │   ├── ProductForm.jsx  # Component form thêm/sửa sản phẩm
│   │   └── ...
│   ├── CategoriesPage/      # Trang quản lý danh mục
│   │   ├── CategoriesPage.jsx
│   │   ├── CategoryList.jsx
│   │   └── CategoryForm.jsx
│   └── NotFoundPage.jsx
├── services/                # Các module tương tác với API backend (S - Single Responsibility, D - Dependency Inversion)
│   ├── api.js               # Cấu hình Axios/Fetch chung
│   ├── productService.js    # Các hàm gọi API liên quan đến sản phẩm
│   └── categoryService.js   # Các hàm gọi API liên quan đến danh mục
├── utils/                   # Các hàm tiện ích (helper functions)
│   ├── helpers.js
│   ├── constants.js
│   └── validation.js
├── App.jsx                  # Component gốc của ứng dụng
├── index.css                # CSS toàn cục
└── main.jsx                 # Entry point của ứng dụng (React 18)
Giải thích về cách áp dụng SOLID trong Frontend:

Single Responsibility Principle (SRP):

Mỗi component, hook, service chỉ có một lý do duy nhất để thay đổi. Ví dụ: ProductCard chỉ hiển thị sản phẩm, productService chỉ lo việc tương tác API sản phẩm.

Thư mục components, hooks, services là ví dụ rõ ràng nhất.

Open/Closed Principle (OCP):

Các module có thể mở rộng nhưng đóng để chỉnh sửa. Ví dụ: Các custom hooks (useProducts, useForm) có thể được sử dụng lại ở nhiều nơi mà không cần thay đổi code bên trong hook đó. Khi có yêu cầu mới (ví dụ: thêm chức năng lọc), ta có thể mở rộng hook hoặc tạo hook mới, không sửa hook cũ.

Các component chung trong common folder cũng là ví dụ tốt.

Liskov Substitution Principle (LSP):

Trong React, LSP thường được áp dụng ngầm qua việc sử dụng props và composition. Một component có thể được thay thế bằng một component khác mà không làm phá vỡ ứng dụng nếu chúng tuân thủ cùng một "giao diện" props.

Interface Segregation Principle (ISP):

Khách hàng không nên bị buộc phụ thuộc vào các giao diện mà họ không sử dụng. Trong React, điều này có thể được thể hiện qua việc chia nhỏ các Context API hoặc tạo các custom hooks nhỏ hơn thay vì một hook lớn chứa quá nhiều logic không liên quan. Ví dụ, ProductContext và CategoryContext riêng biệt.

Dependency Inversion Principle (DIP):

Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào các abstraction. Các abstraction không nên phụ thuộc vào các chi tiết. Các chi tiết nên phụ thuộc vào các abstraction.

Trong ví dụ này, pages (module cấp cao) sẽ gọi các hàm từ services (abstraction) thay vì trực tiếp gọi fetch hay axios (chi tiết cấp thấp). Các services lại phụ thuộc vào một api.js (abstraction) chung.
==================
Phân tích Backend: 
- Framework: NestJs + Typescript
- Database: PostgreSQL + TypeORM
- Authentication: JWT + Passport
- Documentation: Swagger / OpenAPI
- Port: 3000 (default) hoặc từ env variable
- Data structure: 
    + Product Entity: id, name, description, quantity, price, categoryId, category
    + Category Entity: id, name, description, products
- API Endpoints: 
    + Product:
    > POST /products - tạo sản phẩm mới
    > GET /products - Lấy danh sách sản phẩm (filter theo name, categoryId)
    > GET /products/:id - Lấy sản phẩm theo ID
    > PATCH /products/:id - Cập nhật sản phẩm
    > DELETE /products/:id - Xoá sản phẩm
    + Categories:
    > POST /categories - Tạo danh mục mới
    > GET /categories - Lấy danh sách theo mục
    > GET /categories/:id - Lấy danh mục theo ID
    > PATCH /categories/:id - Cập nhật danh mục
    > DELETE /categories/:id - Xoá danh mục
- Authentication: 
    + Tất cả endpoint đều yêu cầu JWT token
    + Sử dụng Bearer token trong header

==================
## 🚀 DEVELOPMENT FLOW & BUILD PROCESS

### 📋 **Project Overview**
Đây là hệ thống quản lý kho hàng hoàn chỉnh được xây dựng theo kiến trúc **Frontend (React) + Backend (NestJS)** với authentication JWT và database PostgreSQL.

---

## 🏗️ **FRONTEND DEVELOPMENT FLOW**

### **Phase 1: Project Structure Setup (SOLID Architecture)**
```bash
# 1. Tạo cấu trúc thư mục theo SOLID principles
src/
├── components/common/    # Reusable UI components
├── pages/               # Main application pages  
├── hooks/               # Custom React hooks
├── contexts/            # Global state management
├── services/            # API interaction layer
├── utils/               # Helper functions & constants
└── layout/              # App layout components
```

**Mục tiêu:** Tách biệt rõ ràng các trách nhiệm, dễ maintain và scale.

### **Phase 2: Core Infrastructure**
#### **2.1 API Layer Setup**
- ✅ **api.js**: Axios configuration với interceptors
- ✅ **authService.js**: Authentication API calls
- ✅ **productService.js**: Product CRUD operations  
- ✅ **categoryService.js**: Category CRUD operations

```javascript
// Interceptor pattern cho authentication
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

#### **2.2 State Management**
- ✅ **useAuth.js**: Authentication state & login/logout
- ✅ **useProducts.js**: Product list management với useCallback
- ✅ **useCategories.js**: Category list management  
- ✅ **useForm.js**: Form validation utilities

**Key Pattern:** Custom hooks với useCallback để prevent infinite loops:
```javascript
const fetchProducts = useCallback(async () => {
    // API call logic
}, [filters]);
```

#### **2.3 Common Components**
- ✅ **Button**: Multiple variants (primary, secondary, danger)
- ✅ **Input**: With validation error display
- ✅ **Table**: Reusable table với column configuration

### **Phase 3: Authentication System**
#### **3.1 Login Flow**
- ✅ **LoginPage**: Form validation với real-time error clearing
- ✅ **JWT Token Management**: localStorage persistence
- ✅ **Route Protection**: Redirect to login nếu không authenticated
- ✅ **Vietnamese Error Messages**: User-friendly feedback

```javascript
// Login validation với UX improvements
const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
        setFormErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
};
```

### **Phase 4: Main Features Implementation**

#### **4.1 Products Management**
**ProductsPage với complete CRUD:**
- ✅ **Table Layout**: Professional data display
- ✅ **Search Functionality**: Filter by product name
- ✅ **Add/Edit Modal**: Form validation với price/quantity limits
- ✅ **Category Dropdown**: Integration với categories API
- ✅ **Validation Rules**: 
  - Price max: 99,999,999.99 VNĐ (database precision limit)
  - Quantity max: 999,999
  - Name length: 2-100 characters

```javascript
// Form validation để prevent database overflow
const validateForm = (data) => {
    const errors = {};
    const price = parseFloat(data.price);
    
    if (price > 99999999.99) {
        errors.price = 'Giá không được vượt quá 99,999,999.99 VNĐ';
    }
    
    return errors;
};
```

#### **4.2 Categories Management**
**CategoriesPage với table layout:**
- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Search Filter**: Real-time filtering
- ✅ **Table Display**: Clean, professional layout
- ✅ **Form Validation**: Name & description length limits

### **Phase 5: UI/UX Enhancements**

#### **5.1 Layout System**
- ✅ **AppLayout**: Header + Sidebar navigation
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Color System**: Custom CSS variables
  ```css
  --pakistan-green: #143109
  --sage: #a9b572  
  --beige: #f3f0d7
  --seasalt: #f8f9f9
  ```

#### **5.2 Table Migration**
**Chuyển từ Card layout sang Table layout:**
- ✅ **Professional Display**: Better data organization
- ✅ **Responsive Tables**: Horizontal scroll trên mobile
- ✅ **Hover Effects**: Interactive user experience
- ✅ **Action Buttons**: Inline edit/delete actions

#### **5.3 Search Form Alignment**
- ✅ **Perfect Alignment**: Input và Button cùng height (42px)
- ✅ **Flex Layout**: Proper spacing và responsive
- ✅ **Mobile Stack**: Column layout trên small screens

---

## 🎯 **APPLICATION ARCHITECTURE**

### **Frontend Tech Stack:**
- **React 18** với Vite
- **CSS Modules** cho component styling
- **Axios** cho API calls
- **React Router** cho navigation
- **Custom Hooks** cho state management

### **Key Patterns Applied:**

#### **1. SOLID Principles:**
- **SRP**: Mỗi component/hook có single responsibility
- **OCP**: Components extensible mà không modify existing code
- **ISP**: Small, focused interfaces (separate contexts)
- **DIP**: Pages depend on service abstractions, not implementations

#### **2. React Best Practices:**
- **useCallback**: Prevent infinite re-renders
- **Custom Hooks**: Logic reuse across components  
- **Error Boundaries**: Graceful error handling
- **Controlled Components**: Form state management

#### **3. API Integration Pattern:**
```javascript
// Service Layer Pattern
const productService = {
    getProducts: async (filters) => {
        const response = await api.get('/products', { params: filters });
        return response.data.data || response.data;
    }
};

// Hook Layer Pattern  
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    
    const fetchProducts = useCallback(async () => {
        const data = await productService.getProducts(filters);
        setProducts(data);
    }, [filters]);
    
    return { products, fetchProducts };
};
```

---

## 🚦 **BUILD & RUN PROCESS**

### **Development Setup:**
```bash
# Frontend (Port 5173)
cd frontend
npm install
npm run dev

# Backend (Port 3000) 
cd backend
npm install
npm run start:dev
```

### **Authentication Flow:**
1. **Login**: POST `/auth/login` → receive JWT token
2. **Token Storage**: localStorage persistence
3. **API Calls**: Auto-inject Bearer token via interceptor
4. **Route Protection**: Redirect to login if 401 Unauthorized

### **Data Flow:**
1. **Pages** call **Custom Hooks**
2. **Hooks** call **Services** 
3. **Services** call **Backend APIs**
4. **Backend** interacts với **PostgreSQL Database**

---

## 📊 **FEATURES IMPLEMENTED**

### ✅ **Authentication:**
- Login với JWT tokens
- Route protection
- Auto-logout on token expiry
- Vietnamese error messages

### ✅ **Products Management:**
- View products table with pagination
- Search/filter by name
- Add new products với validation
- Edit existing products
- Delete products với confirmation
- Category assignment

### ✅ **Categories Management:**
- View categories table
- Search categories by name  
- CRUD operations với validation
- Integration với products

### ✅ **UI/UX:**
- Responsive design (mobile-first)
- Professional table layouts
- Form validation với real-time feedback
- Loading states và error handling
- Consistent color scheme và typography

---

## 🔄 **VALIDATION SYSTEM**

### **Frontend Validation:**
```javascript
// Price validation để prevent database overflow
if (price > 99999999.99) {
    errors.price = 'Giá không được vượt quá 99,999,999.99 VNĐ';
}

// Quantity validation
if (quantity > 999999) {
    errors.quantity = 'Số lượng không được vượt quá 999,999';
}
```

### **Backend Constraints:**
- Product price: `DECIMAL(10,2)` → max 99,999,999.99
- Product quantity: `INT` → max 2,147,483,647
- Authentication: JWT required cho tất cả endpoints

---

## 📱 **RESPONSIVE DESIGN**

### **Desktop Layout:**
```
[Header với navigation]
[Search: Input Field ——————— | Search Button]
[Data Table với actions]
```

### **Mobile Layout:**  
```
[Header stacked]
[Search Input Full Width]
[Search Button Full Width] 
[Scrollable Table]
```

---

## 🎨 **DESIGN SYSTEM**

### **Color Palette:**
- **Primary**: Pakistan Green (#143109)
- **Secondary**: Sage (#a9b572)
- **Background**: Beige (#f3f0d7)
- **Surface**: Seasalt (#f8f9f9)

### **Component Sizes:**
- **Input/Button Height**: 42px consistent
- **Border Radius**: 8px cho containers, 4px cho inputs
- **Spacing**: 8px, 12px, 16px, 24px scale

**Kết quả:** Một hệ thống quản lý kho hàng hoàn chỉnh, professional và dễ sử dụng! 🎉    



    
    

#   I n v e n t o r y - M a n a g e m e n t -  
 