import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const initialBids = [
  { id: 1, contractor: "ABC Constructions", resource: "JCB", price: 5000, expiresAt: new Date().getTime() + 300000, isExpired: false },
  { id: 2, contractor: "XYZ Contractors", resource: "Cranes", price: 7000, expiresAt: new Date().getTime() + 600000, isExpired: false },
  { id: 3, contractor: "LMN Builders", resource: "Excavator", price: 6500, expiresAt: new Date().getTime() + 900000, isExpired: false },
];

const BidSystem = () => {
  const [bids, setBids] = useState(initialBids);
  const [lowestBid, setLowestBid] = useState(null);
  const [search, setSearch] = useState("");
  const [newBid, setNewBid] = useState({ contractor: "", resource: "", price: "", expiresAt: "" });
  const [selectedBid, setSelectedBid] = useState(null);
  const [editBid, setEditBid] = useState(null);


  const handleViewDetails = (bid) => {
    setSelectedBid(bid); // Set the selected bid to the state
  };

  const handleCloseDetails = () => {
    setSelectedBid(null); // Close the details view
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setBids((prevBids) =>
        prevBids.map((bid) => ({
          ...bid,
          isExpired: now > bid.expiresAt,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const findLowestBid = () => {
    const validBids = bids.filter((bid) => !bid.isExpired);
    const lowest = validBids.reduce((prev, curr) => (prev.price < curr.price ? prev : curr), validBids[0]);
    setLowestBid(lowest);
  };

  const handleAddBid = () => {
    if (newBid.contractor && newBid.resource && newBid.price && newBid.expiresAt) {
      setBids([
        ...bids,
        {
          id: Date.now(),
          contractor: newBid.contractor,
          resource: newBid.resource,
          price: Number(newBid.price),
          expiresAt: new Date(newBid.expiresAt).getTime(),
          isExpired: false,
        },
      ]);
      setNewBid({ contractor: "", resource: "", price: "", expiresAt: "" });
    }
  };

  const handleDeleteBid = (id) => {
    setBids(bids.filter((bid) => bid.id !== id));
  };

  const handleDownloadBids = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      bids
        .map((bid) =>
          [bid.contractor, bid.resource, bid.price, new Date(bid.expiresAt).toLocaleString()].join(",")
        )
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "bids.csv");
  };

  const filteredBids = bids.filter(
    (bid) =>
      bid.contractor.toLowerCase().includes(search.toLowerCase()) ||
      bid.resource.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditBid = (bid) => {
    setEditBid(bid);
  };

  const handleUpdateBid = () => {
    setBids(bids.map((bid) => (bid.id === editBid.id ? { ...editBid } : bid)));
    setEditBid(null);
  };

  const handleBidSort = (criteria) => {
    const sortedBids = [...bids].sort((a, b) => {
      if (criteria === "price") return a.price - b.price;
      if (criteria === "expiration") return a.expiresAt - b.expiresAt;
      return a.contractor.localeCompare(b.contractor);
    });
    setBids(sortedBids);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Advanced Bidding System</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by contractor or resource"
          className="w-full p-2 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort Bids */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleBidSort("price")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Sort by Price
        </button>
        <button
          onClick={() => handleBidSort("expiration")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Sort by Expiry
        </button>
        <button
          onClick={() => handleBidSort("contractor")}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
        >
          Sort by Contractor
        </button>
      </div>

      {/* Bids Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBids.map((bid) => (
          <div
            key={bid.id}
            className={`p-4 rounded-lg shadow-lg ${
              bid.isExpired ? "bg-red-700" : lowestBid && lowestBid.id === bid.id ? "bg-green-700" : "bg-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold">{bid.resource}</h2>
            <p className="mt-2">Contractor: {bid.contractor}</p>
            <p className="mt-1">Price: ₹{bid.price}</p>
            <p className="mt-1">
              Expires:{" "}
              {new Date(bid.expiresAt).toLocaleString()}{" "}
              {bid.isExpired && <span className="text-red-400">(Expired)</span>}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedBid(bid)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteBid(bid.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditBid(bid)}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={findLowestBid}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Highlight Lowest Bid
        </button>
        <button
          onClick={handleDownloadBids}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
        >
          Download Bids
        </button>
      </div>

      {/* Add New Bid */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Bid</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Contractor Name"
            className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newBid.contractor}
            onChange={(e) => setNewBid({ ...newBid, contractor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Resource Name"
            className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newBid.resource}
            onChange={(e) => setNewBid({ ...newBid, resource: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newBid.price}
            onChange={(e) => setNewBid({ ...newBid, price: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="Expiration Date"
            className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newBid.expiresAt}
            onChange={(e) => setNewBid({ ...newBid, expiresAt: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddBid}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Add Bid
          </button>
        </div>
      </div> {/* Show details of the selected bid */}
      {selectedBid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Bid Details</h2>
            <div className="mb-4">
              <p><strong>Contractor:</strong> {selectedBid.contractor}</p>
              <p><strong>Resource:</strong> {selectedBid.resource}</p>
              <p><strong>Price:</strong> ${selectedBid.price}</p>
              <p><strong>Expires At:</strong> {new Date(selectedBid.expiresAt).toLocaleString()}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bid Modal */}
      {editBid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Edit Bid</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={editBid.contractor}
                onChange={(e) => setEditBid({ ...editBid, contractor: e.target.value })}
              />
              <input
                type="text"
                className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={editBid.resource}
                onChange={(e) => setEditBid({ ...editBid, resource: e.target.value })}
              />
              <input
                type="number"
                className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={editBid.price}
                onChange={(e) => setEditBid({ ...editBid, price: e.target.value })}
              />
              <input
                type="datetime-local"
                className="p-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={new Date(editBid.expiresAt).toISOString().slice(0, 16)}
                onChange={(e) => setEditBid({ ...editBid, expiresAt: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdateBid}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditBid(null)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BidSystem;
