# Changelog

All notable changes to the Adyen Checkout API documentation 
are recorded here.

## Version 72.0

Release date: 2024-01-15

### Added

- POST /sessions endpoint for session-based Drop-in integration
- POST /paymentMethods endpoint for retrieving available payment 
  methods by country and currency
- POST /payments endpoint for submitting card payments with 
  end-to-end encryption
- POST /payments/{paymentPspReference}/captures endpoint for 
  auth-capture payment flows
- API key and Bearer token authentication documentation
- PCI DSS compliance guidance for encrypted card data handling
- 3D Secure redirect flow documentation

### Changed

- Base URL updated from v71 to v72
- Amount field now explicitly documented as minor units integer 
  to prevent decimal formatting errors

### Fixed

- Clarified dual authentication requirement for purchase endpoints
- Added missing shopperIP field documentation for fraud detection

## Version 71.0

Release date: 2023-10-10

### Added

- Initial release of Drop-in integration documentation
- Sessions-based payment flow
- Basic error code reference

### Changed

- Unified test and live base URL structure
- Improved response code documentation for resultCode field
