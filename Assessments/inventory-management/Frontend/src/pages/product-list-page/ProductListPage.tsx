import Button from "../../components/Button";
import Table from "../../components/Table";
import TableControllers from "../../components/TableControllers";

import Modal from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import { ChangeEvent, lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { VENDOR } from "../../constants/roles";
import {
  deleteProduct,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductById,
} from "./productSaga";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmForm from "../../components/ConfirmForm";
const ProductForm = lazy(() => import("../../components/ProductForm"));
import { deselectProduct } from "./productSlice";
import SmallLoader from "../../components/SmallLoader";
import StatusComponent from "../../components/StatusComponent";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router";

const ProductListPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [modalReason, setModalReason] = useState<string>("");
  const { userDetails } = useSelector((state: rootState) => state.auth);

  const [pageNum, setPageNum] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [perPage, setPerPage] = useState<number>(10);
  const [category, setCategory] = useState<string>("");
  const [inventoryId, setInventoryId] = useState<string | undefined>("");
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    products,
    details,
    allCategories,
    selectedProduct,
    ...restProductState
  } = useSelector((state: rootState) => state.product);

  const tableData = products?.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: "$ " + product.price,
      inventoryName: product.inventoryName,
      stockStatus: (
        <StatusComponent
          bgColor={`${
            product.stockStatus == "IN_STOCK"
              ? "#c0fcbd"
              : product.stockStatus == "LOW_STOCK"
                ? "#fdff93"
                : "#fcd6d6"
          }`}
          color={`${
            product.stockStatus == "IN_STOCK"
              ? "#029300"
              : product.stockStatus == "LOW_STOCK"
                ? "#8a8e00"
                : "#d10606"
          }`}
          content={product.stockStatus
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
        />
      ),
      categories: product.categories.join(", "),
    };
  });

  useEffect(() => {
    setData(tableData);
  }, [products]);

  console.log(products);

  const columns = [
    { name: "Sr no.", width: "70px" },
    { name: "Product Name", width: "250px" },
    { name: "Price", width: "100px" },
    { name: "Vendor", width: "250px" },
    { name: "Status", width: "150px" },
    { name: "Categories", width: "200px" },
  ];

  const [selectedData, setSelectedData] = useState<any>(selectedProduct);
  const debounceValue = useDebounce({ value: searchTerm, delay: 1000 });
  useEffect(() => {
    setSelectedData(selectedProduct);
  }, [selectedProduct?.id]);

  const handleToggleModal = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalVisible((prev) => !prev);
    setModalReason("");
    setSelectedId("");
  };

  const openDeleteModal = (id: string) => {
    dispatch(deselectProduct());
    setModalReason("deleteProduct");
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const openEditModal = (id: string) => {
    dispatch(deselectProduct());
    setSelectedId(id);
    setModalReason("editProduct");
    setIsModalVisible(true);
  };

  const openAddModal = () => {
    dispatch(deselectProduct());
    setModalReason("addProduct");
    setIsModalVisible(true);
  };

  const handleInventoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "myProducts") {
      userDetails?.inventoryId && setInventoryId(userDetails?.inventoryId);
    } else {
      setInventoryId("");
    }
  };

  const handleRowClick = (id: string) => {
    dispatch(deselectProduct());
    setSelectedId(id);
    navigate(`/products/${id}`);
    // setModalReason("viewProductDetails");
    // setIsModalVisible(true);
  };

  useEffect(() => {
    if (selectedId) {
      dispatch(fetchProductById(selectedId));
    }
  }, [selectedId]);

  useEffect(() => {
    if (confirmDelete) {
      dispatch(
        deleteProduct({
          id: selectedId,
          dispatchAction: () =>
            dispatch(
              fetchAllProducts({
                page: pageNum,
                perPage: 10,
                name: debounceValue,
                category,
                inventoryId: inventoryId,
              }),
            ),
        }),
      );
    }
    return () => {
      setConfirmDelete(false);
      setModalReason("");
      setSelectedId("");
    };
  }, [confirmDelete]);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        page: pageNum,
        perPage: 10,
        name: debounceValue,
        category,
        inventoryId: inventoryId,
      }),
    );
  }, [pageNum, inventoryId, debounceValue, category]);

  useEffect(() => {
    dispatch(fetchAllCategories(1));
  }, []);

  return (
    <>
      {modalReason == "deleteProduct" && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={handleToggleModal}
          childComponent={
            <ConfirmForm
              message="Are you sure, you want to delete this product?"
              buttonContent={"Delete"}
              cancelCb={() => setIsModalVisible(false)}
              actionCb={() => setConfirmDelete(true)}
            />
          }
        />
      )}

      {modalReason == "editProduct" && selectedData && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={handleToggleModal}
          childComponent={
            <Suspense fallback={<SmallLoader />}>
              <ProductForm
                selectedId={selectedId}
                title={"Edit Product"}
                formData={{
                  name: selectedData?.name,
                  description: selectedData?.description,
                  quantity: selectedData?.quantity,
                  price: selectedData.price,
                  categories: selectedData.categories.join(", "),
                }}
              />
            </Suspense>
          }
        />
      )}

      {/* {modalReason == "viewProductDetails" && selectedData && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={handleToggleModal}
          childComponent={
            <Suspense fallback={<SmallLoader />}>
              <ProductDetails productDetails={selectedData} />
            </Suspense>
          }
        />
      )} */}

      {modalReason == "addProduct" && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={handleToggleModal}
          childComponent={
            <Suspense fallback={<SmallLoader />}>
              <ProductForm
                title={"Add Product"}
                formData={{
                  name: "",
                  description: "",
                  quantity: "",
                  price: "",
                  categories: "",
                }}
              />
            </Suspense>
          }
        />
      )}

      <div className="w-full h-full max-h-full px-5">
        <div className="my-3">
          <h1 className="font-bold text-[18px] text-start">Products</h1>
          <p className="text-sm cursor-pointer">
            <span onClick={() => navigate("/")}>Home</span>/
            <span onClick={() => navigate("/products")}>Products</span>
          </p>
        </div>
        <div className="mb-1 flex justify-between gap-2  mt-12">
          <div className="flex gap-2 ">
            <SearchBar
              placeholder="Search by name"
              onChangeCb={(e: any) => setSearchTerm(e.target.value)}
              id="searchProduct"
              name="searchProduct"
              value={searchTerm}
              width="300px"
            />

            {/* <FilterComponent/> */}

            {userDetails?.role == VENDOR && (
              <select
                onChange={(e) => handleInventoryChange(e)}
                defaultValue={"allProducts"}
                className="bg-primary-white text-text-dark py-1 px-2 rounded-[5px] border-[1px] border-table-border cursor-pointer"
              >
                <option value={"myProducts"}>My Products</option>
                <option value={"allProducts"}>All Products</option>
              </select>
            )}

            <select
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={""}
              className="bg-primary-white text-text-dark py-1 px-2 rounded-[5px] border-[1px] border-table-border cursor-pointer"
            >
              {" "}
              <option value={""}>All Categories</option>
              {allCategories.map((category, key) => (
                <option key={key} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            {userDetails?.role == VENDOR && (
              <Button
                btnContent={"Add Product"}
                onClickCb={() => {
                  openAddModal();
                }}
                color="primary-white"
                bgColor="primary-orange"
                width="fit"
              />
            )}
          </div>
        </div>
        {data && (
          <Table
            onClickRowCb={handleRowClick}
            isLoading={restProductState.isLoading}
            tableData={data}
            columns={columns}
            isActions={
              userDetails?.role == VENDOR &&
              inventoryId == userDetails.inventoryId
                ? true
                : false
            }
            actions={[
              {
                content: <MdEdit />,
                onClickCb: (id: string) => {
                  openEditModal(id);
                },
              },
              {
                content: <MdDelete />,
                onClickCb: (id: string) => {
                  openDeleteModal(id);
                },
              },
            ]}
            pageNum={pageNum}
            perPage={10}
          />
        )}
        {details && (
          <TableControllers
            nextPageCb={() => {
              setPageNum((prev) => prev + 1);
            }}
            prevPageCb={() => {
              setPageNum((prev) => prev - 1);
            }}
            pageNum={details?.page}
            totolPages={details?.totalPages}
          />
        )}
      </div>
    </>
  );
};

export default ProductListPage;
