
 This file includes details about requests covered by BRP mock server
 
       Request                                                		Request Type          Response File Id Syntax                     Special comment
	   
	   /apps                                                  		Get                   appCode + "appcode"
	   /apps/{appId}                                          		Get                   appId + "appInfo"
	   /auth/login                                            		Post                  username + password + "login"                           
	   /auth/validate                                         		Post                  payload + "validate"                        payload is from jwt token (String among two dots)	   
	   /customers/{customerId}/bookings/groupactivities       		Get                   customerId + "listbookingactivities"
	   /customers/{customerId}/workoutssummary                		Get                   customerId + "workoutsum"
	   /customers/{customerId}                                		Get                   customerId + "customer"
	   /customers/{customerId}                                		Put                   customerId + "customer"
	   customers/{customerId}/bookings/groupactivities     	  		Post                  groupId + customerId + "grpactivitybooking" 
	   /customers/{customerId}/bookings/services              		Get                   customerId + "customerBookingServices"
	   /customertypes                                         		Get                   "allCustomerTypes"
	   /customers/{customerId}/consents/sedirectdebits        		Get                   customerId + "directDebits"
	   /customers/{customerId}/valuecards                     		Get                   customerId + "valuecard"
	   /services/generatelink/payment                         		Get                   orderId + "generateLink"
	   /businessunits/{selectedBusinessUnit}/groupactivities  		Get                   selectedBusinessUnit + webCategory + startHour + "listgrpactivities"  
	   /businessunits/{selectedBusinessUnit}/groupactivities/{id}   Get                   selectedBusinessUnit + id + "listgrpactivities"
	   messages/{messageId}                                         Get                   messageId 
	   /products/groupactivities                                    Get                   webCategory + "listgrpactivities" / "listgrpactivities" (when no other requests params)
	   /products/groupactivities/{productId}                        Get                   productId + "groupactivitybyproduct"
	   /webcategories/{webCategoriesId}                             Get                   webCategoriesId + "webcategory"
	   /webcategories                                               Get                   "getallwebcategories"
	   /businessunits                                               Get                   "allbusinessunits"
	   /products/subscriptions                                      Get                   "allSubscriptions"(when no other requests params)/                              businessUnit+webCategory+customerType+"subscriptions"
	   /products/subscriptions/{subscriptionId}/additions           Get                   subscriptionId + customerType + "subscriptionAdditions" / subscriptionId + customer + "subscriptionAdditions"
	   /consenttypes                                                Get                   businessUnit + "consenttypes"
	   /businessunits/{businessUnitId}/paymentmethods               Get                   businessUnitId + order + "paymentmethods"
	   /orders                                                      Post                  businessUnit + customer + customerType + "orders"
	   /orders/{orderId}/items/subscriptions                        Post                  orderId + subscriptionProduct + birthDate + "createOrders"
	   /orders/{orderId}                                            Get                   orderId + "orders"
	   /orders/{orderId}/valuecardreservations                      Get                   orderId + "valuecardreservations"
	   /consents/{consentId}                                        Get                   consentId + businessUnit + "consentforbunit"
	   /orders/{orderId}/valuecardreservations                      Post                  orderId + valueCardNumber + "valuecardreservations"
	   /orders/{orderId}/coupons                                    Post                  orderId + couponName + "couponName"
	   /orders/{orderId}/items/valuecards                           Post                  orderId + valueCardProduct +"valueCardProduct"
	   /orders/{orderId}/items/articles                             Post                  orderId + articleProduct + "articleProduct"
	   messages/noShowTerms                                         Get                   businessUnit + "noShowTerms"
	   messages/waitingListTerms                                    Get                   businessUnit + "waitingListTerms"
	   messages/bookingCancellationTerms                            Get                   businessUnit + "bookingCancellationTerms"
	   messages/bookingTerms                                        Get                   businessUnit + "bookingTerms" / "allBookingTerms"
	   messages/appInfo                                             Get                   businessUnit + "bUnitAppInfo"
	   messages/openingHours                                        Get                   businessUnit + "openingHours"
	   
	   
	   