import React from "react"
import { segment } from "@swan-bitcoin/xpub-lib"

const DerivedAddressesTable = ({ addressList, showCount, extPubKey }) => {
  return (
    <>
      <h2 className="text-xl font-bold">Confirm addresses</h2>
      <p className="text-gray-800 mb-6">Please check that your BTC wallet is generating similar addresses as below..</p>
      <table className="fixed">
        <tbody>
          {addressList.map(({ path, address }, i) => {
            return (
              i < (showCount || addressList.length) && (
                <PathAddressRow key={path} path={path} address={address} />
              )
            )
          })}
          <PathAddressRow path="" address="" />
        </tbody>
      </table>
    </>
  )
}

const PathAddressRow = ({ path, address }) => {
  const segments = segment(address)
  return (
    <tr className="border-b border-gray-300">
      <td className="text-md">
        <span title={path}>
          {segments[0]}{segments[1]}{segments[2]}
        </span>
      </td>
    </tr>
  )
}

export { DerivedAddressesTable }
