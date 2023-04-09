import gql from "graphql-tag";

export const LEND_AND_BORROW_TRANSACTIONS = gql`
	query LendAndBorrowTransactions($poolAdd: String, $skip: Int) {
		lendGivenPrincipals(
			first: 5
			skip: $skip
			where: { poolPairAddress: $poolAdd }
		) {
			id
			token0
			token1
			strike
			transactionHash
			blockNumber
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
		borrowGivenPrincipals(
			first: 5
			skip: $skip
			where: { poolPairAddress: $poolAdd }
		) {
			id
			token0
			token1
			strike
			transactionHash
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
	}
`;

export const LEND_AND_BORROW_TRANSACTIONS_BY_USER = gql`
	query LendAndBorrowTransactionsByUser(
		$address: String
		$poolAdd: String
		$skip: Int
	) {
		lendGivenPrincipals(
			first: 5
			skip: $skip
			where: { poolPairAddress: $poolAdd, from: $address }
		) {
			id
			token0
			token1
			strike
			poolPairAddress
			transactionHash
			blockNumber
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
		borrowGivenPrincipals(
			first: 5
			skip: $skip
			where: { poolPairAddress: $poolAdd, from: $address }
		) {
			id
			token0
			token1
			strike
			transactionHash
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
	}
`;