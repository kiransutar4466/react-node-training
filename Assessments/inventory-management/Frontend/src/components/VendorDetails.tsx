import { createVendorPayloadType } from "../types/slice-state-types/vendorStateTypes";

const VendorDetails = ({
  vendorDetails,
}: {
  vendorDetails: createVendorPayloadType;
}) => {
  return (
    <div className="bg-primary-white rounded-xl w-[600px] p-5">
      <div className="flex flex-col justify-between gap-3">
        <h2>
          <span className="font-medium">Vendor Name: </span>{" "}
          {vendorDetails.firstName + " " + vendorDetails.lastName}
        </h2>
        <p>
          <span className="font-medium">Company Name: </span>{" "}
          {vendorDetails.companyName}
        </p>
        <p>
          <span className="font-medium">Email: </span>{" "}
          <a
            href={`mailto:${vendorDetails.email}`}
            className="hover:underline hover:underline-offset-4 hover:text-blue-700"
          >
            {vendorDetails.email}
          </a>
        </p>
        <p>
          <span className="font-medium">Phone: </span>{" "}
          <a
            href={`tel:${vendorDetails.contactNumber}`}
            className="hover:underline hover:underline-offset-4 hover:text-blue-700"
          >
            {vendorDetails.contactNumber}
          </a>
        </p>
        <p>
          <span className="font-medium">Inventory Name: </span>{" "}
          {vendorDetails.inventoryName}
        </p>
        <p>
          <span className="font-medium">City: </span> {vendorDetails.city}
        </p>
        <p>
          <span className="font-medium">Pincode: </span> {vendorDetails.pinCode}
        </p>
      </div>
    </div>
  );
};

export default VendorDetails;
