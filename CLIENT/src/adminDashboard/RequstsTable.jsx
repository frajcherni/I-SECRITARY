import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Alert,
  Avatar,
  Container,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import PaymentModal from './PaymentModal';
import AccountSetupModal from './AccountSetupModal';
import RequestDetailsModal from './RequestDetailsModal';
import useWebSocket from './useWebSocket';
import notificationSound from './notif.mp3';
import axios from 'axios';

const RequestsTable = () => {
  const { data: requests, notification } = useWebSocket('http://localhost:5000/api/requests', 'newRequest', notificationSound);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAccountSetupModal, setShowAccountSetupModal] = useState(false);
  const [amount, setAmount] = useState(null); // State to store the payment amount

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewDetails = (request) => {
    setSelectedRequestId(request._id);
    setSelectedRequest(request);
  };
  const handleCloseModal = () => {
    setSelectedRequestId(null);
    setShowPaymentModal(false);
    setShowAccountSetupModal(false);
  };

  const handleAccept = () => {
    setShowPaymentModal(true);
  };

  const handleNextPayment = (amount) => {
    setAmount(amount); // Store the amount in the state
    setShowPaymentModal(false);
    setShowAccountSetupModal(true); // Trigger the account setup modal
  };

  const handleAccountSubmit = (accountDetails) => {
    // Prepare the data to submit to the backend
    const dataToSubmit = {
      userDetails: accountDetails,
      paymentDetails: amount,
      request: selectedRequest._id // Use selectedRequest._id instead of selectedRequest.UID
    };
    console.log('Submitting data:', dataToSubmit); // Log the data to be submitted

    // Send the data to the backend
    axios
      .post('http://localhost:5000/api/users/createPayment', dataToSubmit)
      .then((response) => {
        // Handle success
        console.log('Account created successfully:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating account:', error);
      });
    // Close the modal or navigate to the next step
    handleCloseModal();
  };
  return (
    <Container maxWidth="lg" className="mx-auto mt-6">
      {notification && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {notification}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell className="w-1/4">Name</TableCell>
              <TableCell className="w-1/4">Title</TableCell>
              <TableCell className="w-1/4">Status</TableCell>
              <TableCell className="w-1/4">Services</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequests.map((request, idx) => (
              <TableRow key={idx}>
                <TableCell className="w-1/4">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <Box>
                      <Typography variant="body1">{request.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {request.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell className="w-1/4">{request.profession}</TableCell>
                <TableCell className="w-1/4">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </TableCell>
                <TableCell className="w-1/4">{request.service}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {selectedRequestId && (
        <RequestDetailsModal
          request={currentRequests.find(req => req._id === selectedRequestId)}
          requestId={selectedRequestId}
          onClose={handleCloseModal}
          onAccept={handleAccept}
        />
      )}
      {showPaymentModal && (
        <PaymentModal
          onClose={handleCloseModal}
          onNext={handleNextPayment}
        />
      )}
      {showAccountSetupModal && (
        <AccountSetupModal
          onClose={handleCloseModal}
          onSubmit={handleAccountSubmit}
          initialUsername={selectedRequest.username}
          initialEmail={selectedRequest.email}
        />
      )}
    </Container>
  );
};

export default RequestsTable;
