import React, { createContext, useState, useEffect } from 'react'
import { getProvider, getSigner, getSignerAndInitialize } from '../helpers/ProviderSigner';
import { QuPeer } from 'quswap-protocol';

const QuPeerContext = createContext()
QuPeerContext.displayName = "QuPeerContext"

export { QuPeerContext };